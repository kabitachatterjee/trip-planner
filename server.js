// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Startegy;
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/loginapp');
//var db = mongoose.connection;


// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// need to add this so that we can accept request payloads from Angular
app.use(bodyParser.json());

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/
 //routes
 var routes = require('./routes/index');
 var users = require('./routes/users');
/*
 * HTML Endpoints
 */

 app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});

// ALL OTHER ROUTES (ANGULAR HANDLES)
// redirect all other paths to index
// app.get('*', function homepage (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

/*
 * JSON API Endpoints
 */

 app.get("/api", controllers.api.index);
 app.get("/api/trips", controllers.trips.index);
 app.get("/api/trips/:id", controllers.trips.show);
 app.post("/api/trips", controllers.trips.create);
 app.put("/api/trips/:id", controllers.trips.update);
 app.delete("/api/trips/:id", controllers.trips.destroy);

 app.set('views', path.join(__dirname, 'views'));
 app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
 app.set('view engine', 'handlebars');

 // Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(session({ secret: 'iloveicecream' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);


 /**********
  * SERVER *
  **********/

 // listen on port 3000
 app.listen(process.env.PORT || 3000, function () {
   console.log("Express server is running on http://localhost:3000/");
 });
