console.log("app.js is linked");

angular
  .module('trip-planner', [])
  .controller('TripsIndexController', TripsIndexController);
TripsIndexController.$inject = ['$http'];
  function TripsIndexController ($http) {
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

              $http({
                  method: 'GET',
                  url: '/api/trips'
                }).then(function successCallback(response) {
                  // what is the structure of this response?
                  console.log(response.data);
                  vm.trips = response.data;
                }, function errorCallback(response) {
                  console.log('There was an error getting the data', response);
                });
  // vm.trips = [
  //             {
  //               name: "New York",
  //               start_dt: "10/15/2017",
  //               end_dt:"10/18/2017",
  //               photo_link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
  //               image: "https://www.burgessyachts.com/media/adminforms/locations/n/e/new_york_1.jpg",
  //               main_attr: "Central Park, Brooklyn Bridge, Broadway"
  //             },
  //             {
  //               name: "Glacier National Park",
  //               start_dt: "03/15/2018",
  //               end_dt:"03/18/2018",
  //               photo_link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
  //               image: "https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/DA3C1F02-1DD8-B71B-0BEA9E07D90D38B8.jpg?width=950&quality=90&mode=crop",
  //               main_attr: "Going to the sun, Grinnell Glacier, Highline trail, Logan Pass, Iceberg Lake trail"
  //             }
  //
  //           ];
}
