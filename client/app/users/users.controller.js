'use strict';

angular.module('probleeApp')
  .controller('UsersCtrl', function ($scope, $routeParams, $location, Users, Utils) {

  $scope.activity = {'solved':25,
					'authored':7,
					'upvoted':11,
					'followers':5};

  $scope.getUsers = function() {
    Users.getUsers().then(function(d) {
      $scope.users = d;
    }).then( function() {
      //do something
    });
  };

  $scope.getUser = function(userId) {
    Users.getUser(userId).then(function(d) {
      $scope.user = d;
      $scope.user.joined = Utils.isoToDate(d.joined);
    }).then( function() {
      //do something
    });
  };

  var init = function () {
  	$scope.tab = 'Solved';
    var _id = $routeParams._id;
    console.log('intializing controller ' + _id);
    $scope.getUser(_id);
  };
  init();



});
