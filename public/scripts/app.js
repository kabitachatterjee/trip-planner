console.log("app.js is linked");

angular.module('trip-planner', ['720kb.datepicker'])
        .config(function($interpolateProvider) {
                $interpolateProvider.startSymbol('{[{');
                $interpolateProvider.endSymbol('}]}');
              })
        .controller('TripsIndexController', TripsIndexController)

TripsIndexController.$inject = ['$http'];

function TripsIndexController ($http, ModalService) {
    var vm = this;
    vm.today = new Date();
    vm.dateOptions = {
                      format: 'MM/dd/yyyy',
                      minDate: vm.today,
                      startingDay: 1
                    };
              $http({
                    method: 'GET',
                    url: '/api/trips'
                    }).then(function successCallback(response) {
                                data = response.data;
                                vm.trips = data.filter(function(el){
                                return Date.parse(el.end_dt) > Date.now()
                                });
                                vm.length = vm.trips.length;
                                vm.pastTrips = data.filter(function(el){
                                          return Date.parse(el.end_dt) < Date.now()
                                  });
                                  vm.pastLength = vm.pastTrips.length;
                      }, function errorCallback(response) {
                            console.log('There was an error getting the data', response);
                          });

//Create function

    vm.createTrip = function() {
                              $http({
                                     method: 'POST',
                                     url: '/api/trips',
                                     data: vm.newTrip,
                                     contentType: 'application/x-www-form-urlencoded'
                                    }).then(function successCallback(response) {
                                                }, function errorCallback(response) {
                                                  console.log('There was an error posting the data', response);
                                                });
                              }
  //Delete function

    vm.deleteTrip = function(trip) {
                                  console.log("clicked to delete" + trip);
                                  if (confirm("Are you sure you want to delete this trip?")) {
                                        $http({
                                                method: 'DELETE',
                                                url: '/api/trips/'+ trip._id
                                              }).then(function successCallback(json) {
                                                    var index = vm.trips.indexOf(trip._id);
                                                    console.log("index is: " + index);
                                                    vm.trips.splice(index,1);
                                                  }, function errorCallback(response) {
                                                      console.log('There was an error deleting the data', response);
                                                  });
                                        }

                                }

//Update function

    vm.editTrip = function(trip) {
                                console.log("clicked to edit" + trip);
                                $http({
                                       method: 'PUT',
                                       url: '/api/trips/'+ trip._id,
                                       data: trip
                                      }).then(function successCallback(json) {
                                                  }, function errorCallback(response) {
                                                      console.log('There was an error updating the data', response);
                                                   });
                                }


} // end of TripsIndexController


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll").style.display = "block";
    } else {
        document.getElementById("scroll").style.display = "none"; }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}
