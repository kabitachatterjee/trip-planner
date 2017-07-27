console.log("app.js is linked");

angular
  .module('trip-planner', [])
  // .config(config)
  .config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})
  .controller('TripsIndexController', TripsIndexController);

TripsIndexController.$inject = ['$http'];

// config.$inject = ['$routeProvider', '$locationProvider'];
// function config(   $routeProvider,  $locationProvider   ) {
//   $routeProvider
//     .when('/', {
//       template: 'This template will show the homepage, with all trips!',
//       controllerAs: 'tripsIndexCtrl',
//       controller: 'TripsIndexController'
//     })
//     .when('/trips/:id', {
//       template: 'This template will show a trip!',
//       controllerAs: 'tripsShowCtrl',
//       controller: 'TripsShowController'
//     });
//
//   $locationProvider.html5Mode({
//     enabled: true,
//     requireBase: false
//   });
// }
  function TripsIndexController ($http) {
    var vm = this;
    vm.newTrip;

    // vm.newTrip = {
    //             name: "London",
    //             start_dt: "09/05/2017",
    //             end_dt: "09/12/2017",
    //             photo_link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
    //             image: "https://media.timeout.com/images/100644443/image.jpg",
    //             main_attr: "British Meuseum, Big Ben, London Eye"
    //           };

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

  vm.createTrip = function () {
    //e.preventDefault();
                              $http({
                                method: 'POST',
                                url: '/api/trips',
                                data: vm.newTrip,
                                contentType: 'application/x-www-form-urlencoded'
                              }).then(function successCallback(response) {

                                console.log(response.data);

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

                              vm.showAdvanced = function(ev) {
                                  $mdDialog.show({
                                    controller: DialogController,
                                    templateUrl: 'dialog1.tmpl.html',
                                    parent: angular.element(document.body),
                                    targetEvent: ev,
                                    clickOutsideToClose:true,
                                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                                  })
                                  .then(function(answer) {
                                    $scope.status = 'You said the information was "' + answer + '".';
                                  }, function() {
                                    $scope.status = 'You cancelled the dialog.';
                                  });
                                };
}
