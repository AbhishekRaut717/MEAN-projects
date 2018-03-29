module.exports = function(app)
{
	var notes = require('../controller/app.controller.js');


	app.get('/api/note', notes.findAll);

	app.get('/api/note/:noteid', notes.findOne);

	app.post('/api/note', notes.create);

	app.put('/api/note/:noteid', notes.update);

	app.delete('/api/note/:noteid', notes.delete);


}