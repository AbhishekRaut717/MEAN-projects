var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const port = 3000;

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var url = require('./app/config/dbconfig.js');

mongoose.connect(url.url);

mongoose.connection.on('error', () => {
	console.log(err);
	process.exit();
});

mongoose.connection.on('open', () => {
	console.log("Connected to db");

});

app.get('/', (req, res) => {
	res.json({'message' : 'welcome to the bookstore'});

});

require('./app/routes/book.routes.js')(app);
//require('./app/routes/author.routes.js')(app);

app.listen(port, () => {
	console.log(`We are live on ${port}`);
});

