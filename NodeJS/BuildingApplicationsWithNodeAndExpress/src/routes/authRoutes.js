var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var passport = require('passport');

var authRouter = express.Router();

var router = function () {
	authRouter.route('/signUp')
		.post(function (req, res) {
			console.log(req.body);
			var url = 'mongodb://localhost:27017';

			mongodb.connect(url, function (err, client) {
				var db = client.db('libraryApp');
				var collection = db.collection('users');
				var user = {
					username: req.body.userName,
					password: req.body.password
				};

				collection.insert(user, function (err, result) {
					req.login(result.ops[0], function () {
						res.redirect('/auth/profile');
					});
					client.close();
				});
			});
		});
	
	authRouter.route('/profile')
		.all(function (req, res, next) {
			if (!req.user) {
				res.redirect('/');
			}
			next();
		})
		.get(function (req, res) {
			res.json(req.user);
		});
	
	authRouter.route('/signin')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
		}), function (req, res) {
			res.redirect('/auth/profile');
		});

	return authRouter;
};

module.exports = router;