const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const config = require('./app/config/config')

let router = express.Router()
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

const app = express()
const welcome = require('./routes/index.route')
const users = require('./routes/auth.route')

app.disable('x-powered-by');
//create a defualtLayout in ./views/layout/main.handlebars
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', welcome)

router.use('/auth', users)

app.all('*', function (req, res, next) {
/**
     * Response settings
     * @type {Object}
     */
var responseSettings = {
    AccessControlAllowOrigin: req.headers.origin,
    AccessControlAllowHeaders:
    'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name',
    AccessControlAllowMethods: 'POST, GET, PUT, DELETE, OPTIONS',
    AccessControlAllowCredentials: true
}

/**
     * Headers
     */
res.header(
    'Access-Control-Allow-Credentials',
    responseSettings.AccessControlAllowCredentials
)
res.header(
    'Access-Control-Allow-Origin',
    responseSettings.AccessControlAllowOrigin
)
res.header(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers']
    ? req.headers['access-control-request-headers']
    : 'x-requested-with'
)
res.header(
    'Access-Control-Allow-Methods',
    req.headers['access-control-request-method']
    ? req.headers['access-control-request-method']
    : responseSettings.AccessControlAllowMethods
)

if ('OPTIONS' == req.method) {
    res.sendStatus(200)
} else {
    next()
}
})

app.use('/api/v1', router)
app.use(function(req, res) {
    console.log("Error 404");
    res.type('text/html');
    res.status(404);
    res.render('404')
});




app.listen(3000, function() {
    console.log("App is running on port " + 3000);
});

app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(passport.initialize())
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = app