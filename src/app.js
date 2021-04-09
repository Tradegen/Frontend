const path = require('path')
const express = require('express')
const hbs = require('hbs')
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var flash = require('connect-flash');
var authRouter = require('../routes/auth');
var indexRouter = require('../routes/index');
var processingRouter = require('../routes/processing');
const bodyParser = require("body-parser");
var MemoryStore = require('memorystore')(session);
var helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  );
  
passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function (user, done) {
done(null, user);
});

const app = express()
//const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(morgan('dev'));

app.use(cookieParser());

// allow parsing of request body data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config express-session
var sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 90 // 90mins
      //secure: true
    },
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000 / 8 // prune expired entries every 3 hours
    }),
    genid: function(req) {
      console.log('session id created');
    return uuidv4();},
    name: process.env.SESSION_NAME
  };

app.set("trust proxy", 1);
  sess.proxy = true;

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https://www.paypal.com", "https://www.stocks2.io", "https://stocks2.io", "https://t.paypal.com", "https://www.gstatic.com/charts/loader.js"],
      scriptSrc: ["'self'", "https://code.jquery.com/jquery-3.1.1.js", "https://code.jquery.com/ui/1.12.1/jquery-ui.js", "https://www.paypal.com", "https://www.paypal.com/sdk/js", "https://t.paypal.com", "https://www.gstatic.com/charts/loader.js", "https://www.googletagmanager.com"],// , (req, res) => `'nonce-${ res.locals.nonce }'`],
      objectSrc: ["'none'", "https://t.paypal.com", "https://www.gstatic.com/charts/loader.js"],
      styleSrc: ["'self'", "https://www.paypal.com", "'unsafe-inline'", "https://t.paypal.com", "https://www.gstatic.com/charts/loader.js", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://t.paypal.com", "https://www.gstatic.com/charts/loader.js"],
      fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      upgradeInsecureRequests: [],
    },
  })
);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Handle auth failure error messages
app.use(function (req, res, next) {
    if (req && req.query && req.query.error) {
      req.flash('error', req.query.error);
    }
    if (req && req.query && req.query.error_description) {
      req.flash('error_description', req.query.error_description);
    }
    next();
});

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', processingRouter);

// Catch 404 error
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

module.exports = app;