'use strict';

angular.module('probleeApp')
  .controller('AuthCtrl', function ($scope, Auth, $location, $window) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

  });