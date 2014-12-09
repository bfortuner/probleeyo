'use strict';

angular.module('probleeApp')
  .controller('EditCtrl', function ($scope, $location, $routeParams, Edit, Topics, Problems) {

  var _id = $routeParams._id;

  $scope.getProblem = function(probId) {
      Problems.getProblem(probId).then(function(d) {
        $scope.problem = d;
        $scope.problem.wordBank = getWordBank(d.wordBank);
        $scope.problem.author = 'admin';
      });
  };

    $scope.editProblem = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Edit.editProblem({
          id: $scope.problem._id,
          title: $scope.problem.title,
          topic: $scope.problem.topic,
          difficulty: $scope.problem.difficulty,
          description: $scope.problem.description,
          code: $scope.problem.code,
          author: $scope.problem.author,
          wordBank: convertWordBankToArr($scope.problem.wordBank)
        }).then( function(res) {
          $location.path('/problems/' + $scope.problem._id);
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

  var getWordBank = function(wordBank) {
      var newWordBank = [];
      var word;
      for (word in wordBank) {
        newWordBank.push({ 'name': wordBank[word] });
      }
      return newWordBank;
  };

    var convertWordBankToArr = function(wordBankObjArr) {
      var newArr = [];
      for (var i in wordBankObjArr) {
        newArr.push(wordBankObjArr[i].name);
      }
      console.log(newArr);
      return newArr;
    };

    $scope.addWord = function() {
      $scope.problem.wordBank.push({'name':''});
    };

    $scope.removeWord = function(index) {
      $scope.problem.wordBank.splice(index,1);
    };

    var initForm = function() {
        $scope.getProblem(_id);
		$scope.difficulty = [1,2,3,4,5];
		Topics.getTopics().then(function(d) {
	    	$scope.topics = d;  
	 	});
  	};
	initForm();

  });