'use strict';

angular.module('probleeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit/:_id', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      });
  });
