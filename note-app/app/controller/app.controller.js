var Note = require('../model/app.model.js');

exports.findAll = (req, res) => {
	
	Note.find((err, data) => {
	
		if(err)
		{
			console.log(err);
			res.status(500).json({'message' : 'some error occured'});
		}
		else
		{
			res.json(data);

		}
	});
}

exports.findOne = (req, res) =>
{
	Note.findById(req.params.noteid, (err, data) => {

		if(err)
		{
			if(err.kind == 'Objectid')
			{
				//return
				res.status(404).json({'message' : 'No note with this id ' + req.params.noteid});
			}
			
				//return
				res.status(500).json({'message' : 'Some error occured'});

		}
		if(!data)
		{
			res.status(404).json({'message' : 'No note content for this id ' + req.params.noteid});
		}

		res.json(data);
	});
}

exports.create = (req, res) => {

	if(!req.body.content)
	{
		res.json({'message' : 'The content of the note cannot be null'});

	}

	var note = new Note({"title" : req.body.title || 'Untitled Note', 'content' : req.body.content});

	note.save((err, data) => {
		if(err)
		{
			console.log(err)
		}
		res.json(data);
	});
};

exports.update = (req, res) => {
    // Update a note identified by the noteId in the request
    Note.findById(req.params.noteid, (err, note) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});                
            }

            return res.status(500).send({message: "Error finding note with id " + req.params.noteId});
        }

        if(!note) {
            return res.status(404).send({message: "Note not found with id " + req.params.noteId});            
        }

        note.title = req.body.title;
        note.content = req.body.content;

        note.save((err, data) => {
            if(err) {
                res.status(500).send({message: "Could not update note with id " + req.params.noteId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = (req, res) => {
    // Delete a note with the specified noteId in the request
    Note.findByIdAndRemove(req.params.noteid, (err, note) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + req.params.noteid});                
            }
            return res.status(500).send({message: "Could not delete note with id " + req.params.noteid});
        }

        if(!note) {
            return res.status(404).send({message: "Note not found with id " + req.params.noteid});
        }

        res.send({message: "Note deleted successfully!"})
    });
};