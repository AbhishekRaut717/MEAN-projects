module.exports = function(app)
{
	var books = require('../api/book.api.js');

	app.get("/api/books", books.findAll);

	app.get("/api/books/:title", books.findOne);

	// app.delete('/api/books/:title', books.delete);


}