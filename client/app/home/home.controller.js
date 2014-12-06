'use strict';

angular.module('probleeApp')
  .controller('HomeCtrl', function ($scope, Topics) {
    Topics.getTopics().then(function(d) {
      $scope.navTopics = d;
    });

  });
