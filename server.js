

//require depenciess
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var DB_URI = "mongodb://localhost:27017/portfolio";

var app = express();


app.set('view engine', 'ejs');
//var home = require(/routes/home);

//app.set('views', path.join( __dirname, '/home/rokayaabed/project/views'));
// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
mongoose.Promise = require('bluebird');
app.use(session({secret: 'rokaya',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
mongoose.connect(DB_URI);
app.use(router);

//app.use('/', home);

// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})
