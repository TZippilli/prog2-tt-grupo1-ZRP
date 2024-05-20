const session = require('express-session');
const db = require("./database/models");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//importo ruteadores
var productRouter = require('./routes/product');
var profileRouter = require('./routes/profile');
var resultsRouter = require('./routes/results');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//defino que solicitud es manejada por qué ruteador 
app.use('/product', productRouter);
app.use('/profile', profileRouter);
app.use('/search-results', resultsRouter);


/*CONFIGURACION SESION*/

app.use(session({
  secret: "myapp",
  resave: false,
  saveUninitialized:  true
}));

app.use(function(req, res, next){
  if(req.session.user != undefined) {
    res.locals.user = req.session.user;
  }
  return next()
});

/*PASAR INFO DE SESSION A LOCALS*/
app.use(function(req, res, next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {
    let id = req.cookies.userId; // 4, 5, 6


      db.User.findByPk(id)
      
      .then(function(result) {
        req.session.user = result;
        req.locals.user = result;
        return next();
      }
      
      .catch(function (error) {
        return console.log(error);
    }));
  } else {
    return next()
    
  }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
