var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var ideaSchema = mongoose.Schema({
  name: String,
  title: String,
  description: String,
  tags: [{type: String, ref: 'Tag'}],
  upvote: {type: Number, default: 0},
  adopters: String
});

var Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
