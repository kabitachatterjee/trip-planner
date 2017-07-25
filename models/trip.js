var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  name: String,
  start_dt: Date,
  end_dt: Date,
  photo_link: String,
  main_attr: String,
  image: {
    type: String,
    default:"http://goldenhillsrealestate.com/files/2010/11/Stevens-trail-sign-2.jpg"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
