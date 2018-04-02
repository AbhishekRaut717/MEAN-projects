var Book = require('../model/book.model.js');

exports.findAll = function(req, res)
{
	Book.find(function(err, data)
	{
		if(err)
		{
			console.log(err);
			res.json({"message" : "Some error ocured"});
		}

		res.json(data);
	});
}

exports.findOne = function(req, res)
{
	Book.find({"title" : req.params.title}, function(err, data){
		if(err)
		{
			if(err.kind === "title")
			{
				res.json({"message" : "no book found with this title"});
			}
			
			res.json({"message" : "some error occured" + err});
		}
		if(!data)
		{
			res.json({"message" : "no books found"});
		}

		res.json(data);
	});
	
}

exports.delete = function(req, res)
{
	Book.remove({"title" : req.params.title}, function(err, data)
	{
		if(err)
		{
			if(err.kind === "title")
			{
				res.json({"message" : `No Book with this title : ${req.params.title}`});
			}

			res.json({"message" : `error ${err} occured`});
		}

		if(!data)
		{
			res.json({"message" : "This title doesn't exist"});

		}

		res.json({"message" : `${req.params.title} deleted sucessfuly`});
	});


}

exports.update = function(req, res)
{
	Book.find({"title" : req.params.book}, function(err, data){

		if(err)
		{
			if(err.kind === "title")
			{
				res.json({"message" : "No books by this title found"});

			}

			res.json({"message" : "some error occured"});
		}

		if(!data)
		{
			res.json({"message" : "No book by this title"});

		}

		var book = new Book();

		book.title = req.body.title;
		book.author = req.body.author;
		book.price = req.body.price;
		book.detail = req.body.detail;

		book.save(function(err, data){
			if(err)
			{
				res.json({"message" : "could not update"})
			}
			else
				{
					res.json({"message" : "data updated successflly"});
				}
			});
	});
}
