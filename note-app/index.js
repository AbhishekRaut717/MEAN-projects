var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = 8000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var dbconfig = require('./app/config/app.database.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url);

mongoose.connection.on("error", () => {
	console.log("Error");
	process.exit();

});

mongoose.connection.on('open', () => {
	console.log("Connection to db successful");

});

app.get('/', (req, res) => {
	res.json({"message" : "welcome to the note-app"});

});

require('./app/routes/app.routes.js')(app);


app.listen(port, () => {
	console.log(`We are love on ${port}`);
});

