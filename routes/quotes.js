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

exports.ideaList = function (req, res) {
  var ideas = Idea.find({}).exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    res.render('ideas', {title:'ideas', ideas:docs});
  });
};

exports.projectList = function (req, res) {
  var projects = Project.find({}).exec(function (err, docs){
    if (err)
      return console.log("error", ideas);
    res.render('projects', {title:'projects', projects:docs});
  });
};
