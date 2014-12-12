'use strict';

angular.module('probleeApp')
  .controller('UsersCtrl', function ($scope, $routeParams, $location, Users, Utils, Attempts, Problems) {
  $scope.authored = [];
  $scope.followers = [];

  $scope.getUsers = function() {
    Users.getUsers().then(function(d) {
      $scope.users = d;
    }).then( function() {
      //do something
    });
  };

  $scope.getUser = function() {
    Users.getUser($scope.userId).then(function(d) {
      $scope.user = d;
      $scope.user.joined = Utils.isoToDate(d.joined);
    }).then( function() {
      console.log($scope.user);
    });
  };

  $scope.getUserSolved = function() {
    Attempts.getUserSolved($scope.userId).then(function(d) {
      $scope.solvedAttempts = d.attempts;
      $scope.solvedProblems = createProbDict(d.problems);
    }).then( function() {
    });
  };

  var createProbDict = function(probObjArr) {
    var dict = {};
    for (var i in probObjArr) {
      dict[probObjArr[i]._id] = probObjArr[i];
    }
    return dict;
  }

  var init = function () {
  	$scope.tab = 'Solved';
    $scope.userId = $routeParams._id;
    $scope.getUser();
    $scope.getUserSolved();
  };
  init();



});
