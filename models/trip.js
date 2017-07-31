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
                                    default:"http://media.cmgdigital.com/shared/img/photos/2014/04/12/58/74/99_reasons_to_travel.jpg"
                                  },
                            user: [{
                                    type: Schema.Types.ObjectId,
                                    ref: 'User'
                                  }],

                          created_at:{
                                      type: Date,
                                      default: Date.now
                                    }
                            });

var Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
