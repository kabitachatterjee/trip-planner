var db = require("../models");
var Trip = db.Trip;
// GET /api/trips
function index(req, res) {
  // send back all our trips as JSON objects
  console.log(req.user._id);
  Trip.find({}, function(err, allTrips) {
    console.log(allTrips);
    allTrips = allTrips.filter(function(el){
                    return String(el.user[0]) === String(req.user['_id'])
                    });
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
  // send back all our trips with the newly created trip as JSON objects
  console.log(req.user);
  req.body.user = req.user;
  console.log(req.body);
  var newTrip = new Trip(req.body);
  console.log(newTrip);
    newTrip.save(function(err,trip){
      if(err){
        console.log("post error: " + err);
        res.sendStatus(500);
      }
    console.log("Success");
    res.redirect('/');
    //res.flash('success_msg', 'Trip added successfully');
  });
}

function destroy(req, res) {
  // searches a trip by its id and deletes it
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
  // searches a trip by its id and updates it based on request params
  var trip = Trip.findById(req.params.id, function(err, trip) {
    if (err) {
      console.log('error, trip not found');
    }
    // creating an object "trip" which will capture any form-data given OR hold onto
    // the trip's existing information for that field
    trip.name = req.body.name || trip.name;
    trip.start_dt = req.body.start_dt || trip.start_dt;
    trip.end_dt = req.body.end_dt || trip.end_dt;
    trip.image = req.body.image || trip.image;
    trip.main_attr = req.body.main_attr || trip.main_attr;
    // saving the trip object with updated fields & responding with json data object
    trip.save(function(err, savedTrip) {
      console.log("Updated successfully");
      res.json(savedTrip)
    });
  });
}


module.exports = {
                  index: index,
                  create: create,
                  show: show,
                  destroy: destroy,
                  update: update
                };
