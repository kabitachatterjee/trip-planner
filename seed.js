var db = require("./models");
var Trip = db.Trip;

var tripList = [
                {
                name: "New York",
                photo_link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
                image: "http://www.tapeciarnia.pl/tapety/normalne/210989_lato_las_potok_drozka.jpg",
                main_attr: "Central Park, Brooklyn Bridge, Broadway"
              },
              {
              name: "Glacier National Park",
              photo_link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
              image: "http://www.tapeciarnia.pl/tapety/normalne/210989_lato_las_potok_drozka.jpg",
              main_attr: "Going to the sun, Grinnell Glacier, Highline trail, Logan Pass, Iceberg Lake trail"
            }
            ];

Trip.remove({}, function(err, trips) {

  Trip.create(tripList, function(err, trip) {
    if (err) {
      return console.log("error: ", err);
    }
    console.log("created new trips list");
    process.exit();
  });
});
