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

// exports.create = function(req, res)
// {
// 	if(!req.body.title || !req.body.author)
// }

exports.findOne = function(req, res)
{
	Book.findOne({"title" : req.params.title}, function(err, data){
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
