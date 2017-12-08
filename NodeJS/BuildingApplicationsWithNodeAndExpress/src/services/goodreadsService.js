var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({ explicitArray: false });

var goodreadsService = function () {
	var getBookById = function (id, cb) {
		var options = {
			host: 'www.goodreads.com',
			path: '/book/show/' + id + '?format=xml&key=r6B4fHm0TbSqXSyKDZ1jQ'
		};

		var callback = function (response) {
			console.log('Response is :' + response);
			var str = '';
			response.on('data', function (chunk) {
				console.log('New chunk of data: ' + chunk);
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				parser.parseString(str, function (err, result) {
					cb(null, result.GoodreadsResponse.book);
				});
			});
		};

		var request = https.request(options, callback);

		request.on('error', function (e) {
			console.log(e);
		});

		request.end();
	};

	return {
		getBookById: getBookById
	};
};

module.exports = goodreadsService;