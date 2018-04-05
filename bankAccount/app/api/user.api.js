var Account = require("../model/model.js");
var bodyParser = require("body-parser");



exports.create = (req, res) => 
{
	if(!req.body.user_id || !req.body.password || !req.body.type_of_ac || !req.body.balance)
	{
		res.json({"message" : "Please fill out the complete information"});
	}

	var account = new Account({"user_id" : req.body.user_id, "password" : req.body.password, "type_of_ac" : req.body.type_of_ac, "balance" : req.body.balance, 'branch_id' : req.body.branch_id});

	account.save((err, data) =>
	{
		if(err)
		{
			res.json({"message" : "Some error ocured while saving the account information"});
		}

		res.json(data)
	});
}

exports.login = (req, res) =>
{
	//var userID = req.body.user_id;
	//var password = req.body.password;
	Account.findOne({"user_id" : req.body.user_id}, (err, data) => {
		if(err)
		{
			if(err.kind === "user_id")
			{
				res.json({"message" : `No Account found by ${req.body.user_id} Account ID`});
			}

			res.json({"message" : "Some unknown error occured"});

		}

		if(data === null)
		{
			res.json({"message" : `No Info avaiable for ${req.body.user_id} account....Please check the A/C credentials again`});
		}
		else
		{
			if(data.password === req.body.password)
			{
				res.json({"message" : "Login Successful"});
			}
			else
			{
				res.json({"message" : "Incorrect Password"});
			}
		}
});
}
	
exports.info = (req, res) =>
{
	Account.find({user_id : req.params.user_id}, (err, data) => {

		if(err)
		{
			if(err.kind === "user_id")
			{
				res.json({"message" : `No account with ${req.params.user_id} found`});
			}

			res.json({"message" : "Some Unknown error occured"});
		}

		if(!data)
		{
			res.json({"message" : "No data in this account "});
		}

		if(data)
		{
			res.json({"user_id" : data[0].user_id, "branch_id" : data[0].branch_id, "type_of_ac" : data[0].type_of_ac, "createdAt" : data[0].createdAt});
			
		}
	});
}

exports.balance = (req, res) =>
{
	Account.find({user_id : req.params.user_id}, (err, data) => {

		if(err)
		{
			if(err.kind === "user_id")
			{
				res.json({"message" : `No account with ${req.params.user_id} found`});
			}

			res.json({"message" : "Some error occured"});
		}

		if(!data)
		{
			res.json({"message" : "No data in this account"});
		}

		if(data)
		{
			res.json({balance : data[0].balance});
		}
	});
}

exports.sendMoney = function(req, res)
{
	Account.findOne({"user_id" : req.params.user_id}, function(err, data){
		if(err)
		{
			console.log(err)
		}


		if(data)
		{
			var tranc_Amount = req.body.tranc_Amount;
			//var senderOriginal = data.balance;
			data.balance -= tranc_Amount;

			data.save((err, updateddata) => {
				if(err)
				{
					console.log(err);
				}
				// else
				// {
				// 	res.send("trancaction successful");
				// }

				Account.findOne({"user_id" : req.body.receiver}, function(err, data) {
					if(err)
					{
						console.log(err);
					}

					if(data)
					{
						data.balance += tranc_Amount;

						data.save((err, receiverData) => {
							if(err)
							{
								console.log(err);
							}
							else
							{
								res.json({"message" : `${req.body.receiver} received ${req.body.tranc_Amount} amount form ${req.params.user_id}`});
							}
						});
					}
				});
			});
		}
	});
}

