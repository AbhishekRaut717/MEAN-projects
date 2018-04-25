var mongoose = require('mongoose');

BookSchema = mongoose.Schema({

	"title" : String,
	"author" : String,
	"price" : Number,
	"detail" : String
},{
	timestamp : true
});

module.exports = mongoose.model('Book', BookSchema);