//Module dependencies.
const express = require('express');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const passport = require('passport');
const swig = require('swig');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const fs=require("fs");
const path = require("path");
const flash = require('express-flash');
const expressStatusMonitor = require('express-status-monitor');
const app = express();

dotenv.load({ path: '.env' });

app.set('port', process.env.PORT || 9090);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
swig.setDefaults({varControls: ['<%=', '%>']});

//MONGO DB CONNECTION INITIALIZATION
require("./app_db/connection").connect();
var SessionStore = new MongoStore({url:  process.env.MONGODB_DEV  || process.env.MONGODB_LOCAL,autoReconnect: true})
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  key:'rbis.sid',
  store: SessionStore
}));

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.json({limit: '1000024mb'}));
app.use(bodyParser.urlencoded({limit: '1000024mb', extended: true}));
app.use(cookieParser());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(flash());

  
require('./passport/passport')(passport);
require("./app_imports/app_imports")(app,passport);


//handle upload of files
require('./utils/filemanagement')(app);
app.use(expressStatusMonitor());

module.exports = app;



