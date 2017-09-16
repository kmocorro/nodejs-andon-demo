var express = require('express');
var app = express();
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var apiController = require('./controllers/apiController');

var Promise = require('promise');

var port = process.env.PORT || 3000;

//  use the public folder to fetch data
app.use('/', express.static(__dirname + '/public'));

//  set the view engine 
app.set('view engine', 'ejs');

//  cookie set
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
 name: 'session',
 keys: ['key1', 'key2']
}));

// run the function inside apicontroller
apiController(app);

function checkAuth(req, res, next) {
    if (!req.session.employee_id) {
      res.render('authfail');
    } else {
      next();
    }
  }


app.get('/', function(req, res){
    res.render('index');
});

app.get('/home', checkAuth, function(req, res){
    res.render('home');
});

app.get('/tooltime', checkAuth, function(req, res){
    res.render('tooltime');
});


//  to change oee and uph
app.get('/settings', checkAuth, function(req, res){
    res.render('settings');
});






//  listen to port localhost:3000
app.listen(port);
