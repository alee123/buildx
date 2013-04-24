var mongojs = require('mongojs')
var db = mongojs(process.env.MONGOLAB_URI || 'olinapps-quotes', ['quotes']);
var olinapps = olinapps = require('olinapps')
 
/**
 * Routes
 */

exports.home = function (req, res) {
  db.quotes.find({
    published: true
  }).sort({date: -1}, function (err, docs) {
    console.log(docs);
    res.render('index', {
      title: 'Olin Quotes Board v4.0',
      quotes: docs,
      user: olinapps.user(req)
    });
  })
};

exports.delete = function (req, res) {
  console.log(olinapps.user(req).username);
  db.quotes.update({
    _id: db.ObjectId(req.body.id),
    submitter: olinapps.user(req).username
  }, {
    $set: {
      published: false
    }
  }, function () {
    res.redirect('/');
  })
};

exports.name = function (req, res) {
  db.quotes.distinct('name', function (err, names) {
    res.json(names);
  });
};

exports.quote = function (req, res) {
  if (req.body.name && req.body.quote) {
    db.quotes.save({
      name: req.body.name,
      quote: req.body.quote,
      submitter: olinapps.user(req).username,
      date: Date.now(),
      published: true
    }, res.redirect.bind(res, '/'));
  } else {
    res.json({error: true, message: 'Invalid quote'}, 500);
  }
};