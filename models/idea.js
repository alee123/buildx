var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var ideaSchema = mongoose.Schema({
  name: String,
  description: String,
  files: [{type: String, ref:'FilePath'}],
  tags: [{type: String, ref: 'Tag'}],
  upvote: {type: Number, default: 0}
});

var Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
