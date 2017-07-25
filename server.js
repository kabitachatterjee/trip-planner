// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// need to add this so that we can accept request payloads from Angular
//app.use(bodyParser.json());

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

//  app.get('/', function homepage(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});

// ALL OTHER ROUTES (ANGULAR HANDLES)
// redirect all other paths to index
app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

 app.get("/api", controllers.api.index);
 app.get("/api/trips", controllers.trips.index);
 app.get("/api/trips/:id", controllers.trips.show);
 app.post("/api/trips", controllers.trips.create);
 app.put("/api/trips/:id", controllers.trips.update);
 app.delete("/api/trips/:id", controllers.trips.destroy);



 /**********
  * SERVER *
  **********/

 // listen on port 3000
 app.listen(process.env.PORT || 3000, function () {
   console.log("Express server is running on http://localhost:3000/");
 });
