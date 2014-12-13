'use strict';

angular.module('probleeApp')
  .controller('ProblemsCtrl', function ($scope, $sce, $filter, $route, $routeParams, $location, Problems, Auth, Users, Attempts) {

  $scope.topic = $routeParams.topic;
  $scope._id = $routeParams._id;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser; //method


   /* --------- Initialize Problem -------- */

  $scope.getProblem = function(probId) {
    Problems.getProblem(probId).then(function(d) {
      $scope.prob = d;
      $scope.prob._id = d._id;
      $scope.prob.wordBank = getWordBank(d.wordBank);
      $scope.prob.codeLines = getProbCodeLines(d.code);
      $scope.correctAnswers = getCorrectAnswers(d.code);
      $scope.userAnswers = getUserAnswers($scope.correctAnswers.length);
      $scope.createAttempt();
    });
  };

  $scope.createAttempt = function() {
    $scope.attempt = {};
    $scope.attempt.attempts = 0;
    $scope.attempt.status = 'attempted';
    $scope.attempt.userId = $scope.getCurrentUser()._id;
    $scope.attempt.probId = $scope.prob._id;
    Attempts.createAttempt($scope.attempt).then(function(d) {
        $scope.res = d;
        $scope.attempt._id = d._id;
        console.log($scope.attempt._id);
    }).then( function() {
        //do nothing
    });
  };

  $scope.getProblems = function() {
   if (!$scope.topic) {
      $scope.getAllProblems();  
    } else if ($scope.topic === 'shuffle') {
      $scope.getShuffleProblems();
    } else {
      $scope.getProblemByTopic($scope.topic);  
    }
  };

  $scope.getProblemByTopic = function(topic) {
    Problems.getProblemsByTopic(topic).then(function(d) {
      $scope.problems = d;
    }).then( function() {
      $scope.getNextProblem();  
    });
  };

  $scope.getShuffleProblems = function() {
    Problems.getShuffleProblems().then(function(d) {
      $scope.problems = d;
    }).then( function() {
      $scope.getNextProblem();  
    });
  };

  $scope.getAllProblems = function() {
    Problems.getProblems().then(function(d) {
      $scope.problems = d;
    }).then( function() {
      $scope.getNextProblem();  
    });
  };

  $scope.getNextProblem = function() {
    if ($scope.problems.length === 0) {
        $location.path('/');
        //$('.alert').show().removeClass('alert-danger').addClass('alert-success').text('Nice! You completed all the problems in this set.');
    } else {
        var probIndex = (Math.random()*$scope.problems.length) | 0;
        var id = $scope.problems[probIndex]._id;
        $scope.getProblem(id);
        var lastProb = $scope.problems.splice(probIndex,1);
        return id;
    }
  };

  var getWordBank = function(wordBank) {
      var newWordBank = [];
      var word;
      for (word in wordBank) {
        newWordBank.push({ 'title': wordBank[word], 'drag': true });
      }
      return newWordBank;
  };

  var getCorrectAnswers = function(probCodeStr) {
      var correctAnswers = probCodeStr.match(/\{\{((?!\}\})(?!\{\{).)+\}\}/g);
      for (var i=0; i<correctAnswers.length; i++) {
          correctAnswers[i] = correctAnswers[i].substring(correctAnswers[i].search('{{')+2, 
            correctAnswers[i].search('}}'));
      }
      return correctAnswers;
  };

  var getUserAnswers = function(count) {
    var answers = [];
    var i = 0;
    while (i<count) {
      answers.push([]);
      i++;
    }
    return answers;
  };  

  /* 
    Input: code string with user wildcards {{hello}}
    
    Output: Matrix with code string split on '\n'
    and then split again on '{{wildcards}}'

    User wildcards are swapped out with placeholders
    each holding an index val ( '{{W}}0', '{{W}}1' )

    def myFunc = function() { \n
      var {{foo}} = 'hello';\n
      {{return}} foo ;\n

    [ ['def myFunc = function() {'],
      ['var ', '{{W}}0', ' = ', ''hello';'],
      ['{{W}}1', ' foo ;'] 
    ] 
  */ 
  var getProbCodeLines = function(probCodeStr) {
    var codeLines = probCodeStr.split('\n');
    var curWildcardIndex = 0;
    for (var i in codeLines) {
      var curLineStr = codeLines[i];
      //curLineStr = curLineStr.replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
      //curLineStr = curLineStr.replace("  ", "&nbsp;&nbsp;");
      var curSubList = [];
      var wildcards = curLineStr.match(/\{\{((?!\}\})(?!\{\{).)+\}\}/g);
      if (wildcards) {
        var start = 0;
        for (var j in wildcards) {
          //var wildcardIndex = curLineStr.search(/\{\{((?!\}\})(?!\{\{).)+\}\}/);
          var wildcardIndex = curLineStr.indexOf(wildcards[j]);
          curSubList.push(curLineStr.substring(start, wildcardIndex));
          curSubList.push('{{W}}' + curWildcardIndex);

          start = wildcardIndex + wildcards[j].length;
          curWildcardIndex++;
        }
        curSubList.push(curLineStr.substring(start));
      } else {
        curSubList.push(curLineStr);
      }
      codeLines[i] = curSubList;
    }

    return codeLines;
  };





  /* -------- Handle User Actions --------- */

  $scope.updateAttempt = function() {
    Attempts.updateAttempt($scope.attempt).then(function(d) {
        $scope.res = d;
        console.log($scope.res);
    }).then( function() {
        //do nothing
    });
  };

  $scope.popWord = function(index) {
    if ($scope.userAnswers[index].length > 0) {
      var val = $scope.userAnswers[index].pop();
      $scope.prob.wordBank.push(val);
    }
  };

  $scope.submitCode = function(){
     if(checkAnswer()) {
        $('.alert').show().removeClass('alert-danger').addClass('alert-success').text('Good Job');
        $scope.attempt.status = 'correct';
        $scope.attempt.solved = new Date();
        $scope.attempt.attempts++;
        $scope.updateAttempt();
        $scope.getNextProblem();
      } else {
        $('.alert').show().removeClass('alert-success').addClass('alert-danger').text('Incorrect! Try again.');
        $scope.attempt.status = 'incorrect';
        $scope.attempt.attempts++;
        $scope.updateAttempt();
      }
      setTimeout(function(){
        $('.alert').fadeOut();
      }, 2000);
  };

  var checkAnswer = function() {  
    for (var i=0; i < $scope.correctAnswers.length; i++) {
      if ($scope.userAnswers[i].length === 0 || !$scope.userAnswers[i][0]) {
        return false;    
      } else if ($scope.correctAnswers[i] !== $scope.userAnswers[i][0].title) {
        return false; 
      }
    }
    return true;
  };

  var init = function () {
    if ($scope._id) {
      $scope.getProblem($scope._id);
    } else {
      $scope.getProblems();  
    }
  };
  init();


}); //end of controller
