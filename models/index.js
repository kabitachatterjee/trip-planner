var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/trip-planner");

//require & export the trails model through index.js
module.exports.Trip = require("./trip.js");
