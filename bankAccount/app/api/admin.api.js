var Account = require("../model/model.js");

exports.findAll = (req, res) =>
{
	Account.find((err, data) => {
		if(err)
		{
			res.json({"message" : "Some error occured"});
		}

		res.json(data);
	});
}

exports.update = function(req, res)
{
	Account.findOne({"user_id" : req.params.user_id}, function(err, data) {
		if(err)
		{
			console.log(err)
		}

		if(data)
		{
			//res.json(data);
			data.type_of_ac = req.body.type_of_ac;
			data.branch_id = req.body.branch_id;
			data.user_id = req.body.user_id;
			

			data.save((err, updatedData) => {
				if(err)
				{
					console.log(err)
				}
				else
				{
					res.json({"message" : `Info for ${req.params.user_id} updated`});
				}
			});
		}
	});
}

exports.delete = function(req, res)
{
	Account.remove({"user_id" : req.body.user_id}, (err, data) => {
		if(err)
		{
			console.log(err)
		}
		else
		{
			res.json({"message" : `Account ${req.body.user_id} deleted sucessfully `});
		}

	});
}

