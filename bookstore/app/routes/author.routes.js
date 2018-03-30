module.exports = function(app)
{
	var authors = require('./app/api/author.api.js');

	app.get('/api/authors/:author', authors.findOne);

	app.post('/api/authors', authors.create);

	app.put('/api/authors/:author', authors.update);

	app.delete('/api/authors/:author', authors.delete);
}