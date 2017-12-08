var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
	passport.use(new LocalStrategy(
		{ 
			usernameField: 'userName',
			passwordField: 'password'
		},
		function (userName, password, done) {
			var url = 'mongodb://localhost:27017';
			mongodb.connect(url, function (err, client) {
				var db = client.db('libraryApp');
				var collection = db.collection('users');

				collection.findOne({ username: userName }, function (err, results) {
					if (err) {
						console.log(err);
					} else {
						if (results.password === password) {
							var user = results;
							done(null, user);
							client.close();
						} else {
							done(null, false, 'Bad password');
						}
					}
				});
			});
		}));
};