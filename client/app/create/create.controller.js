'use strict';

angular.module('probleeApp')
  .controller('CreateCtrl', function ($scope, $location, Create, Topics) {

    $scope.createProblem = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Create.createProblem({
          title: $scope.problem.title,
          topic: $scope.problem.topic,
          difficulty: $scope.problem.difficulty,
          description: $scope.problem.description,
          code: $scope.problem.code,
          author: $scope.problem.author,
          wordBank: $scope.problem.wordBank.split(',')
        }).then( function(res) {
          console.log(res._id);
          $location.path('/problems/' + res._id);
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    var initForm = function() {
	    $scope.problem = {};
    	$scope.errors = {};
    	$scope.difficulty = [1,2,3,4,5];
    	Topics.getTopics().then(function(d) {
        	$scope.topics = d;
        	$scope.problem.topic = $scope.topics[0].name;     
     	});
     	$scope.problem.difficulty = $scope.difficulty[0];
    	$scope.problem.code = 'var myFunc = function() {\n\n\treturn foo;\n}';
	};
	initForm();

  });