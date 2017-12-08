var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
	var middleware = function (req, res, next) {
		if (!req.user) {
			//res.redirect('/');
		}
		
		next();
	};
	
	var getIndex = function (req, res) {
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
	};

	var getById = function (req, res) {
		var id = new ObjectId(req.params.id);
		var url = 'mongodb://localhost:27017';
		mongodb.connect(url, function (err, client) {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				var db = client.db('libraryApp');
				var books = db.collection('books');
				books.findOne({_id: id}, function (err, result) {
					if (result.bookId) {
						bookService.getBookById(result.bookId, function (err, book) {
							result.book = book;
							res.render('bookView', {
								title: 'Books',
								nav: nav,
								book: result
							});
						});
					} else {
						res.render('bookView', {
							title: 'Books',
							nav: nav,
							book: result
						});
					}					
				});
			}
		});
	};

	return {
		getIndex: getIndex,
		getById: getById,
		middleware: middleware
	};
};

module.exports = bookController;