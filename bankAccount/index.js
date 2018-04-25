var express = require("express");
var app = express();

const port = 7000;

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var mongoose = require("mongoose");

var url = require("./app/config/db.config.js");

mongoose.Promise = global.Promise;

mongoose.connect(url.path);

mongoose.connection.on("error", () => {
	console.log(err);
	process.exit();
});

mongoose.connection.on("open", () => {
	console.log("db established");
});

app.get('/', (req, res) => {
	res.json({"message" : "Welcome to THE BANK"});
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/admin.routes.js")(app);

app.listen(port, () => {
	console.log(`We are open for business on ${port}`);
});