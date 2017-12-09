var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if (process.env.ENV === 'Test') {
	db = mongoose.connect('mongodb://localhost:27017/bookAPI_test', { useMongoClient: true });
} else {
	db = mongoose.connect('mongodb://localhost:27017/bookAPI', { useMongoClient: true });
}

var app = express();

var Book = require('./models/bookModel');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
	res.send('Welcome to my API!');
});

app.listen(port, function () {
	console.log('Listening on port: ' + port);
});

module.exports = app;