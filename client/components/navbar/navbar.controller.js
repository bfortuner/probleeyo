'use strict';

angular.module('probleeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.topics = [{
      'title': 'Strings',
      'link': '/problems/strings'
    },
    {
      'title': 'Lists',
      'link': '/problems/lists'
    },
    {
      'title': 'Functions',
      'link': '/problems/functions'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });