var db = require("../models");
var Trip = db.Trip;
// GET /api/trips
function index(req, res) {
  // send back all our trips as JSON objects
  Trip.find({}, function(err, allTrips) {
    res.json(allTrips);
  });

}

function show(req, res) {
  // find one trip by its id
  console.log('trip show', req.params);
  Trip.findById(req.params.id, function(err, trip){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(trip);
  });
}

function create(req, res) {
  // send back all our trips as JSON objects
  var newTrip = new Trip(req.body);
    newTrip.save(function(err,trip){
      if(err){
        console.log("post error: " + err);
        res.sendStatus(500);
      }
    console.log("Success");
    res.json(newTrip);
  });
}

function destroy(req, res) {
  console.log("trip_id:",req.params.id);
  var tripID = req.params.id;
  Trip.findByIdAndRemove({"_id": tripID}, function(err, trip) {
    if (err) {
      console.log("delete errror");
    }
    console.log("deleted trip successfully");
    res.json(trip);
  });

}
function update(req, res) {
  // send back all our trips as JSON objects

}


module.exports = {
  index: index,
 create: create,
   show: show,
 destroy: destroy,
 update: update
};
