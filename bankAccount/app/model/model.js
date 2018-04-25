var mongoose = require("mongoose");

var AccountSchema = mongoose.Schema({

	"user_id" : String,
	"password" : String,
	"branch_id" : Number,
	"type_of_ac" : String,
	"balance" : Number
},{
	timestamps : true
});

module.exports = mongoose.model("Account", AccountSchema);