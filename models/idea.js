var mongoose = require('mongoose');

var ideaSchema = mongoose.Schema({
  name: String,
  description: String,
  files: [{type: String, ref:'FilePath'}],
  collaborators: [{type: String, ref: 'Collaborator'}],
  upvote: {type: Number, default: 0}
});

var Idea = mongoose.model('Idea', ideaSchema);

module.exports = Project;
