var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
const routes = ['',
	'API/admin/downgrade','API/admin/upgrade',
	'API/block',
	'API/unblock',
	'API/change-password',
	'API/marks',
	'API/products',
	'API/register',
	'API/users',
	'login',
	'logout',
];

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('session'));

routes.forEach((route)=>{
	const element = require(`./routes/${route}`);
	console.log(`./routes/${route}`);
	app.use(`/${route}`, element);
});

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'session'
}));

module.exports = app;
