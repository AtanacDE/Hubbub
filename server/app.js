var bodyParser = require("body-parser"); 
var createError = require('http-errors');
var express = require('express'); 
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

// Constants
const APP_PORT = 4000;
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Routes
indexRouter(app, db);
userRouter(app, db);

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
  console.log("test");
});

db.sequelize.sync().then( () => {
  app.listen(APP_PORT, () => 
    console.log('Webserver listening to port', APP_PORT)
  );
});
