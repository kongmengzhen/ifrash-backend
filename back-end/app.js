const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const goodsRouter=require('./routes/goods')
const authMiddleware = require('./middleware/auth')
const app = express();

// view engine setup

app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    escape:false //默认为true
});
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'art');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  secret: '012345abcde',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/goods',authMiddleware,goodsRouter)

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
