var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

var router = function(nav) {
	bookRouter.use(function (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		}
		
		next();
	});

	bookRouter.route('/')
		.get(function(req, res) {
			var url = 'mongodb://localhost:27017';
			mongodb.connect(url, function (err, client) {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					var db = client.db('libraryApp');
					var books = db.collection('books');
					books.find({}).toArray(function (err, results) {
						res.render('bookListView', {
							title: 'Books',
							nav: nav,
							books: results
						});
					});
				}
			});
			
		});

	bookRouter.route('/:id')
		.get(function(req, res) {
			var id = new objectId(req.params.id);
			var url = 'mongodb://localhost:27017';
			mongodb.connect(url, function (err, client) {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					var db = client.db('libraryApp');
					var books = db.collection('books');
					books.findOne({_id: id}, function (err, result) {
						res.render('bookView', {
							title: 'Books',
							nav: nav,
							book: result
						});
					});
				}
			});
		});

	return bookRouter;
};

module.exports = router;