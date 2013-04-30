var olinapps = olinapps = require('olinapps')
var Project = require('../models/project')
var Idea = require('../models/idea') 

/**
 * Routes
 */

exports.home = function (req, res) {
  res.render('index', {
    title: 'buildx',
    user: olinapps.user(req)
  });
};

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

exports.upvote = function(req,res){
  console.log(req.body);
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