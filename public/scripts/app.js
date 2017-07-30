console.log("app.js is linked");

angular
  .module('trip-planner', ['720kb.datepicker'])
  .config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})
  .controller('TripsIndexController', TripsIndexController);



TripsIndexController.$inject = ['$http'];


  function TripsIndexController ($http) {
    var vm = this;
    vm.today = new Date();
              $http({
                  method: 'GET',
                  url: '/api/trips'
                }).then(function successCallback(response) {
                  console.log(response.data);
                  data = response.data;
                  vm.trips = data.filter(function(el){

                                  return Date.parse(el.end_dt) > Date.now()
                                  });
                                  console.log(vm.trips);
                  vm.pastTrips = data.filter(function(el){

                                  return Date.parse(el.end_dt) < Date.now()
                                  });
                                  console.log(vm.pastTrips);

                }, function errorCallback(response) {
                  console.log('There was an error getting the data', response);
                });

  vm.createTrip = function () {
                              $http({
                                method: 'POST',
                                url: '/api/trips',
                                data: vm.newTrip,
                                contentType: 'application/x-www-form-urlencoded'
                              }).then(function successCallback(response) {

                                //console.log(response.data);

                              }, function errorCallback(response) {
                                console.log('There was an error posting the data', response);
                              });
                            }

vm.showTrip = function (trip) {
  console.log("clicked to view" + trip);

                                  $http({
                                  method: 'GET',
                                  url: '/api/trips/'+ trip._id
                                  }).then(function successCallback(json) {
                                  }, function errorCallback(response) {
                                    console.log('There was an error deleting the data', response);
                                  });
                                }

vm.deleteTrip = function (trip) {
  console.log("clicked to delete" + trip);
  alert("Are you sure you want to delete this trip?");

                                  $http({
                                  method: 'DELETE',
                                  url: '/api/trips/'+ trip._id
                                  }).then(function successCallback(json) {
                                    var index = vm.trips.indexOf(trip._id);
                                    console.log("index is: " + index);
                                    vm.trips.splice(index,1)
                                  }, function errorCallback(response) {
                                    console.log('There was an error deleting the data', response);
                                  });
                                }

  vm.editTrip = function (trip) {
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

}
