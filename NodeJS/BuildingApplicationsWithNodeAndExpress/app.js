var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
	Link: '/books',
	Text: 'Books'
},
{
	Link: '/authors',
	Text: 'Authors'
}
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Index',
		nav: [{
			Link: '/books',
			Text: 'Books'
		},
		{
			Link: '/authors',
			Text: 'Authors'
		}
		]
	});
});

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/books', function(req, res) {
	res.send('Hello Books!');
});

app.listen(port, function() {
	console.log('running server on port ' + port);
});