const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require("./database/models");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const profileRouter = require('./routes/profile');
const resultsRouter = require('./routes/results');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "myapp",
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use(function(req, res, next) {
  if (req.cookies.userId && !req.session.user) {
    db.User.findByPk(req.cookies.userId)
      .then(function(result) {
        req.session.user = result;
        next();
      })
      .catch(function(error) {
        console.log(error);
        next();
      });
  } else {
    next();
  }
});

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/profile', profileRouter);
app.use('/search-results', resultsRouter);

// Manejo de errores
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
