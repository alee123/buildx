var olinapps = olinapps = require('olinapps')
var Project = require('../models/project')
var Idea = require('../models/idea') 

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
  res.render('homepage', {
    title: 'buildx',
    user: olinapps.user(req)
  });
};

exports.info = function (req, res){
    res.render('whatisbuildx', {
    title: 'buildx',
    user: olinapps.user(req)
  });
}

exports.newProject = function(req,res){
  console.log(req.body);
  var project = new Project({
    leader: olinapps.user(req).username,
    title: req.body.name, 
    description: req.body.projdescription, 
    abbrevDescription: ((req.body.projdescription).slice(0,100)).toString(),
    coverphoto: '', 
    files:'', 
    collaborators: [req.body.collaborators]
  });
  console.log(project);
  project.save(function(err){
    if (err)
      return console.log(err);
  });
};

exports.newIdea = function(req,res){
  console.log(req.body);
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
    var ideas = Idea.update({_id:req.body._id}, {$set: {'upvote':ups[0].upvote+1}}).exec(function (err,docs){
      if (err)
        return console.log(ideas);
      console.log(docs);
    });
  });
};

exports.ideaList = function (req, res) {
  var ideas = Idea.find({}).exec(function (err, docs){
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
  var projects = Project.find({}).sort("-_id").exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    console.log(docs);
    res.render('newproject', {title:'projects', projects:docs});
  });
};

exports.upvote = function(req,res){
  console.log(req.body._id);
  var user = olinapps.user(req).username;
  var upFind = Idea.find({_id:req.body._id}).exec(function (err, ups){
    var ideas = Idea.update({_id:req.body._id}, {$set: {'upvote':ups[0].upvote+1}}).exec(function (err,docs){
      if (err)
        return console.log(ideas);
      console.log(docs);
    });
  });
};