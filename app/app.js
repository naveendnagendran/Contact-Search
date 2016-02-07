'use strict';

// Declare app level module which depends on views, and components
angular.module('mycontacts', [
  'ngRoute',
  'mycontact.mycontacts'
]).


config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/mycontacts'});
}]);


