'use strict';

angular.module('probleeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:_id', {
        templateUrl: 'app/users/profile.html',
        controller: 'UsersCtrl'
      });

});
