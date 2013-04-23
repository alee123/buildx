var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  leader: String,
  description: String,
  coverPhoto: String,
  files: [{type: String, ref:'FilePath'}],
  collaborators: [{type: String, ref: 'Collaborator'}],
  upvote: {type: Number, default: 0}
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
