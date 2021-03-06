var olinapps = olinapps = require('olinapps')
var Project = require('../models/project')
var Idea = require('../models/idea') 
var formidable = require("formidable")
var rem = require("rem")
var People = require('../models/people')
var Dropbox = require("dropbox")

/**
 * Routes
 */

exports.submit = function (req, res) {
  res.render('submitStuff', {
    title: 'buildx',
    user: olinapps.user(req),
    uname: olinapps.user(req).username
  });
};

exports.home = function (req, res) {
  var projects = Project.find({}).sort("-_id").exec(function (err, projs){
    var ideas = Idea.find({}).sort("-_id").exec(function (err, iders){
      res.render('homepage', {
        title: 'buildx',
        user: olinapps.user(req), 
        projects: projs.slice(0,4),
        ideas: iders.slice(0,3),
        banners: ["/projectbanner.png", "/ideabanner.png"],
        uname: olinapps.user(req).username
      });
    });
  });
};

exports.info = function (req, res){
    res.render('whatisbuildx', {
    title: 'buildx',
    user: olinapps.user(req),
    uname: olinapps.user(req).username
  });
}

exports.newProject = function(req,res){
  var project = new Project({
    leader: olinapps.user(req).username,
    title: req.body.name, 
    description: req.body.projdescription, 
    abbrevDescription: ((req.body.projdescription).slice(0,100)).toString(),
    coverPhoto: req.body.selectedfile, 
    files:req.body.files.split(", "), 
    collaborators: [req.body.collaborators]
  });
  project.save(function(err){
    if (err)
      return console.log(err);
  });
};

exports.newIdea = function(req,res){
  var idea = new Idea({
    name:olinapps.user(req).username,
    title:req.body.idea,
    description:req.body.ideadescription,
    files:'',
    tags:[]
  });
  idea.save(function(err){
    if (err)
      return console.log(err);
  });
};

exports.adopt = function(req,res){
  var user = olinapps.user(req).username;
  var adoptFind = Idea.find({_id:req.body._id}).exec(function (err, ads){
    var alreadyAdopted = ads[0].adopters;
    if(alreadyAdopted==""){
      alreadyAdopted = user;
    }
    else if (alreadyAdopted.indexOf(user)<0){
      alreadyAdopted = alreadyAdopted + ", " + user;
    }
    console.log(alreadyAdopted);
    var ideas = Idea.update({_id:req.body._id}, {$set: {'adopters':alreadyAdopted}}).exec(function (err,docs){
      if (err)
        return console.log(ideas);
    });
  });
};

exports.ideaList = function (req, res) {
  var ideas = Idea.find({}).sort("-_id").exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    console.log(docs);
    res.render('ideas', {title:'ideas', ideas:docs, uname: olinapps.user(req).username});
  });
};

exports.projectList = function (req, res) {
  var projects = Project.find({}).sort("-_id").exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    console.log(docs);
    res.render('projects', {title:'projects', projects:docs, uname: olinapps.user(req).username});
  });
};

exports.projectprof = function (req, res) {
  var id = req.params.projID;
  var projects = Project.find({_id:id}).exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    console.log(docs);
    res.render('newproject', {title:'projects', project:docs[0], uname: olinapps.user(req).username});
  });
};

exports.upvote = function(req,res){
  var user = olinapps.user(req).username;
  var upFind = Idea.find({_id:req.body._id}).exec(function (err, ups){
    var upvoters = ups[0].upvoters;
    if(upvoters.indexOf(user)==-1){
      upvoters.push(user);
      var ideas = Idea.update({_id:req.body._id}, {$set: {'upvoters':upvoters,'upvote':upvoters.length}}).exec(function (err,docs){
        if (err)
          return console.log(ideas);
      });
    }
  });
};

exports.update = function(req,res){
  var allIdeas = Idea.find().sort("-_id").exec(function (err, all){
    if (err)
      return console.log(ideas);
    res.render('_ideas', {ideas:all, uname: olinapps.user(req).username});
  });
};

exports.upvoteP = function(req,res){
  var user = olinapps.user(req).username;
  var upFind = Project.find({_id:req.body._id}).exec(function (err, ups){
    var upvoters = ups[0].upvoters;
    if(upvoters.indexOf(user)==-1){
      upvoters.push(user);
      var projs = Project.update({_id:req.body._id}, {$set: {'upvoters':upvoters, 'upvote':upvoters.length}}).exec(function (err,docs){
        if (err)
          return console.log(ideas);
      });
    }

  });
};

exports.findPerson = function(req,res){
  var name = req.params.name;
  var found;
  var  person = People.find({searchAs:req.params.name}).exec(function (err, all){
    if (err)
      return console.log(ideas);
    found = all[0];
    console.log(found);
    var projects = Project.find({$or:[{collaborators:name},{leader:name}]}).exec(function (err, projs){
      var ideas = Idea.find({adopters:name}).exec(function (err, iders){
        var title = found.name + "'s Profile";
        res.render('people', {title:title, person:found, projects:projs, ideas:iders, uname: olinapps.user(req).username});
      });
    });
  });
};

/*
exports.findPerson = function(req,res){
  var name = req.params.name;
  var studentNum;
  rem.json('http://directory.olinapps.com/api/people').get({
    sessionid: req.session['sessionid']
  }, function (err, json) {
    var people = json.people;
    for (var i = 0; i < people.length; i++){
      if (people[i].email.indexOf(name) > -1){
        var projects = Project.find({$or:[{collaborators:name},{leader:name}]}).exec(function (err, projs){
          console.log(people[i]);
          res.render('people', {title:'Profile Page', person:people[i], projects:projs});
        });
      }
    }
  });
};
*/