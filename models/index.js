var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/trip-planner");

//require & export the trips model through index.js
module.exports.Trip = require("./trip.js");
module.exports.User = require("./user.js");
