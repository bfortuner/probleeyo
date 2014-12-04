'use strict';

angular.module('probleeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/topics', {
        templateUrl: 'app/topics/topics.html',
        controller: 'TopicsCtrl'
      });
  });
