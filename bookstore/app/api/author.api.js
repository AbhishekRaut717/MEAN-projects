var Book = require('../model/book.model.js');

exports.create = function(req, res)
{
	if(!req.body.author || !req.body.title)
	{
		res.json({"message" : "The name of book or author name cannot be null"});
	}

	var book = new Book({"title" : req.body.title, "author" : req.body.author, "price" : req.body.price, "detail" : req.body.detail});

	book.save((err, data) => {
		if(err)
		{
			console.log(err);
			res.json({"mesage" : "error occured"});
		}

		res.json(data);
	});
}

exports.findOne = function(req, res)
{
	Book.find({"author" : req.params.author}, function(err, data){

		if(err)
		{
			if(err.kind === "title")
			{
				res.json({"mesage" : `No booksby ${req.params.author} found`});

			}

			res.json({"message" : `Some error occured: ${err}`});
		}

		if(!data)
		{
			res.json({"message" : `No books by ${req.params.author}`});
		}

		res.json(data);
	});
}

exports.delete = function(req, res)
{
	Book.remove({"author" : req.params.author}, function(err, data){

		if(err)
		{
			if(err.kind === "title")
			{
				res.json({"message" : "no author found"});
			}
			res.json({"message" : "some error occured"});
		
		}		
		if(!data)
		{
			res.json({"message" : "no books by this author"});
		}

		res.json({"message" : "Books by this author deleted successfully"});
	});
}

