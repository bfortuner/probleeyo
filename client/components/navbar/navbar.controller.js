'use strict';

angular.module('probleeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Topics) {

    Topics.getTopics().then(function(d) {
        $scope.topics = d;
        console.log(d);
     })

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