'use strict';

angular.module('probleeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/problems', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      })
      .when('/problems/topic/:topic', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      })
      .when('/problems/topic/:topic/:id', {
        templateUrl: 'app/problems/problems.html',
        controller: 'ProblemsCtrl'
      });
  });
