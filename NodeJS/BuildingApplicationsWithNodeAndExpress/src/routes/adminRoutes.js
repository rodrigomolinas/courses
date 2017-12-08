var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

var books = [{
	title: 'War and Peace',
	genre: 'Historical Fiction',
	author: 'Lev Nikolayevich Tolstoy',
	bookId: 656,
	read: false
},
{
	title: 'Les Miserables',
	genre: 'Historical Fiction',
	author: 'Victor Hugo',
	bookId: 24280,
	read: false
},
{
	title: 'Atlas Shrugged',
	genre: 'Philosophy Fiction',
	author: 'Ayn Rand',
	read: false
},
{
	title: 'Time Machine',
	genre: 'Historical Fiction',
	author: 'El viejo loco',
	read: false
},
{
	title: 'Lord of the Rings',
	genre: 'Fantasy',
	author: 'Tolkien',
	read: false
}
];

var router = function(nav) {
	adminRouter.route('/addBooks')
		.get(function(req, res) {
			var url = 'mongodb://localhost:27017';
			mongodb.connect(url, function (err, client) {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					var db = client.db('libraryApp');
					var collection = db.collection('books');
					collection.insertMany(books, function (err, results) {
						res.send(results);
						client.close();
					});
				}
			});
		});

	return adminRouter;
};

module.exports = router;