'use strict';

angular.module('probleeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/problems', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      })
      .when('/problems/:topic', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      })
      .when('/problems/:topic/:id', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      })
  });
