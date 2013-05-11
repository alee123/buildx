var mongoose = require('mongoose');

var peopleSchema = mongoose.Schema({
	name: String,
	nickname: String,
	email: String,
	year: String,
	avatar: String,
	thumbnail: String,
	searchAs: String

});

var People = mongoose.model('People', peopleSchema);

module.exports = People;

