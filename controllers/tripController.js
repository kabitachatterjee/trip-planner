var db = require("../models");
var Trip = db.Trip;
// GET /api/trips
function index(req, res) {
  // send back all our trips as JSON objects
  Trip.find({}, function(err, allTrips) {
    res.json(allTrips);
  });

}
function create(req, res) {
  // send back all our trips as JSON objects

}
function show(req, res) {
  // send back all our trips as JSON objects

}
function destroy(req, res) {
  // send back all our trips as JSON objects

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
