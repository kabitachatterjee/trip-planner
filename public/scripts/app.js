console.log("app.js is linked");

angular
  .module('trip-planner', [])
  .controller('TripsIndexController', TripsIndexController);

  function TripsIndexController () {
    var vm = this;
    vm.newTrip = {};

    vm.newTrip = {
                name: "London",
                start_dt: "09/05/2017",
                end_dt: "09/12/2017",
                photo_link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
                image: "https://media.timeout.com/images/100644443/image.jpg",
                main_attr: "British Meuseum, Big Ben, London Eye"
              };

            }
