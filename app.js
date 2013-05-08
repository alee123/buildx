
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , quotes = require('./routes/quotes')
  , olinapps = require('olinapps')
  , mongojs = require('mongojs')
  , MongoStore = require('connect-mongo')(express)
  , rem = require('rem');

var app = express();

app.configure(function () {
  //db = mongojs(process.env.MONGOLAB_URI || 'olinapps-quotes', ['quotes']);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('secret', process.env.SESSION_SECRET || 'terrible, terrible secret')
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session({
    secret: app.get('secret'),
    store: new MongoStore({
      url: process.env.MONGOLAB_URI || 'mongodb://localhost/olinapps-quotes'
    })
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.set('host', 'localhost:3000');
  app.use(express.errorHandler());
});

app.configure('production', function () {
  app.set('host', 'quotes.olinapps.com');
});

/**
 * Authentication
 */

app.post('/login', olinapps.login);
app.all('/logout', olinapps.logout);
app.all('/*', olinapps.middleware);
app.all('/*', olinapps.loginRequired);

app.get('/', quotes.home);
app.post('/submit/project', quotes.newProject);
app.post('/submit/idea', quotes.newIdea);
app.get('/ideas', quotes.ideaList);
app.get('/projects', quotes.projectList);
app.post('/upvote', quotes.upvote);
app.post('/upvoteP', quotes.upvoteP);
app.get('/submit', quotes.submit);
app.get('/info', quotes.info)
app.get('/upvote', quotes.update);
app.get('/projects/:projID', quotes.projectprof);
app.post('/adopt', quotes.adopt);
app.get('/find/:name', quotes.findPerson);

/*
app.get('/students.json', function (req, res) {
  console.log(req.session['sessionid']);
  rem.json('http://directory.olinapps.com/api/people').get({
    sessionid: req.session['sessionid']
  }, function (err, json) {
    res.json(json);
  });
})


/**
 * Launch
 */

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on http://" + app.get('host'));
});
