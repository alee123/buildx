var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  leader: String,
  title: String,
  description: String,
  abbrevDescription: String,
  coverPhoto: {type: String, default:"/images/cat.jpg"},
  files: [{type: String, ref:'FilePath'}],
  collaborators: [{type: String, ref: 'Collaborator'}],
  upvote: {type: Number, default: 0},
  upvoters: [{type: String, ref: 'Upvote'}]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
