'use strict';

angular.module('probleeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create', {
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      });
  });
