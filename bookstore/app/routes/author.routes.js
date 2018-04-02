module.exports = function(app)
{
	var authors = require('../api/author.api.js');

	app.get('/api/authors/:author', authors.findOne);

	app.post('/api/authors', authors.create);

	app.delete('/api/authors/:author', authors.delete);


}