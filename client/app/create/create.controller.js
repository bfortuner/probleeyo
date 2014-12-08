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
          wordBank: convertWordBankToArr($scope.problem.wordBank)
        }).then( function(res) {
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

    var convertWordBankToArr = function(wordBankObjArr) {
      var newArr = [];
      for (var i in wordBankObjArr) {
        newArr.push(wordBankObjArr[i].name);
      }
      return newArr;
    };

    $scope.addWord = function() {
      $scope.problem.wordBank.push({'name':''});
    };

    $scope.removeWord = function(index) {
      $scope.problem.wordBank.splice(index,1);
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
    	$scope.problem.code = 'var myFunc = function() {\n\tvar foo  =  {{\'hello\'}} ;\n\t{{return}}  foo ;\n}';
	    $scope.problem.wordBank = [{'name':''}]; // array of word objects
  };
	initForm();

  });