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
    leader: req.body.name, 
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
    name:req.body.idea,
    description:req.body.ideadescription,
    files:'',
    tags:[]
  });
  idea.save(function(err){
    if (err)
      return console.log(err);
  });
};