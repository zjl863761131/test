var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/upload');
var logoutRouter = require('./routes/logout');
var getmsgRouter = require('./routes/getmsg');
var getphotoRouter = require('./routes/getphoto');
var downloadRouter = require('./routes/downloadphoto');
var changeheadRouter = require('./routes/changehead');
var downloadheadRouter = require('./routes/downloadhead');
var sortRouter = require('./routes/sort')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/tmp')));
app.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

app.use(bodyParser.urlencoded({"limit":"100000kb"}));
app.use(bodyParser.json({"linit":"100000kb"}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/logout', logoutRouter);
app.use('/getmsg', getmsgRouter);
app.use('/getphoto', getphotoRouter);
app.use('/downloadphoto', downloadRouter);
app.use('/changehead', changeheadRouter);
app.use('/downloadhead', downloadheadRouter);
app.use('/sort', sortRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
