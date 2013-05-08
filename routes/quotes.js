var olinapps = olinapps = require('olinapps')
var Project = require('../models/project')
var Idea = require('../models/idea') 
var formidable = require("formidable")
var rem = require("rem")

/**
 * Routes
 */

exports.submit = function (req, res) {
  res.render('submitStuff', {
    title: 'buildx',
    user: olinapps.user(req)
  });
};

exports.home = function (req, res) {
  var projects = Project.find({}).sort("-_id").exec(function (err, docs){
    res.render('homepage', {
      title: 'buildx',
      user: olinapps.user(req), projects: docs.slice(0,4)
    });
  });
};

exports.info = function (req, res){
    res.render('whatisbuildx', {
    title: 'buildx',
    user: olinapps.user(req)
  });
}

exports.newProject = function(req,res){
  var project = new Project({
    leader: olinapps.user(req).username,
    title: req.body.name, 
    description: req.body.projdescription, 
    abbrevDescription: ((req.body.projdescription).slice(0,100)).toString(),
    coverphoto: '', 
    files:'', 
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
    else{
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
    res.render('ideas', {title:'ideas', ideas:docs});
  });
};

exports.projectList = function (req, res) {
  var projects = Project.find({}).sort("-_id").exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    console.log(docs);
    res.render('projects', {title:'projects', projects:docs});
  });
};

exports.projectprof = function (req, res) {
  var id = req.params.projID;
  var projects = Project.find({_id:id}).exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    console.log(docs);
    res.render('newproject', {title:'projects', project:docs[0]});
  });
};

exports.upvote = function(req,res){
  var user = olinapps.user(req).username;
  var upFind = Idea.find({_id:req.body._id}).exec(function (err, ups){
    var ideas = Idea.update({_id:req.body._id}, {$set: {'upvote':ups[0].upvote+1}}).exec(function (err,docs){
      if (err)
        return console.log(ideas);
    });
  });
};

exports.update = function(req,res){
  var allIdeas = Idea.find().sort("-_id").exec(function (err, all){
    if (err)
      return console.log(ideas);
    res.render('_ideas', {ideas:all});
  });
};

exports.upvoteP = function(req,res){
  var user = olinapps.user(req).username;
  var upFind = Project.find({_id:req.body._id}).exec(function (err, ups){
    console.log(ups[0].upvote);
    var ideas = Project.update({_id:req.body._id}, {$set: {'upvote':ups[0].upvote+1}}).exec(function (err,docs){
      if (err)
        return console.log(ideas);
    });
  });
};

exports.findPerson = function(req,res){
  var name = req.params.name;
  var studentNum;
  rem.json('http://directory.olinapps.com/api/people').get({
    sessionid: req.session['sessionid']
  }, function (err, json) {
    //res.json(json);
    var students = err.people;
    res.json(json);
    for (i=0; i<students.length; i++){
      var atSign = students[i].email.indexOf("@");
      var temp = students[i].email.subtr(0, atSign);
      if(temp == name){
        studentNum = i;
      }
    };
    console.log(studentNum);
  });
};

