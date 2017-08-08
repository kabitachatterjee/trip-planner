console.log("app.js is linked");

angular.module('trip-planner', ['720kb.datepicker','ui.materialize'])
        .config(function($interpolateProvider) {
                $interpolateProvider.startSymbol('{[{');
                $interpolateProvider.endSymbol('}]}');
              })
        .controller('TripsIndexController', TripsIndexController)

TripsIndexController.$inject = ['$http'];

function TripsIndexController ($http) {


    var vm = this;

    var currentTime = new Date();
vm.currentTime = currentTime;
vm.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
vm.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
vm.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
vm.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
vm.disable = [false, 1, 7];
vm.today = 'Today';
vm.clear = 'Clear';
vm.close = 'Close';
var days = 15;
vm.minDate = (new Date(vm.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
vm.maxDate = (new Date(vm.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
vm.onStart = function () {
    console.log('onStart');
};
vm.onRender = function () {
    console.log('onRender');
};
vm.onOpen = function () {
    console.log('onOpen');
};
vm.onClose = function () {
    console.log('onClose');
};
vm.onSet = function () {
    console.log('onSet');
};
vm.onStop = function () {
    console.log('onStop');
};

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
