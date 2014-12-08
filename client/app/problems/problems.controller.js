'use strict';

angular.module('probleeApp')
  .controller('ProblemsCtrl', function ($scope, $sce, $filter, $route, $routeParams, $location, Problems) {

  var topic = $routeParams.topic;

   /* --------- Initialize Problem -------- */

  $scope.getNextProblem = function() {
   if (!topic) {
      $scope.getAllProblems();  
    } else if (topic === 'shuffle') {
      $scope.getShuffleProblems();
    } else {
      $scope.getProblemByTopic(topic);  
    }
  };

  $scope.getProblemByTopic = function(topic) {
    Problems.getProblemsByTopic(topic).then(function(d) {
      $scope.problems = d;
    }).then( function() {
      $scope.getProblem();
    });
  };

  $scope.getShuffleProblems = function() {
    Problems.getShuffleProblems().then(function(d) {
      $scope.problems = d;
    }).then( function() {
      $scope.getProblem();
    });
  };

  $scope.getAllProblems = function() {
    Problems.getProblems().then(function(d) {
      $scope.problems = d;
    }).then( function() {
      $scope.getProblem();
    });
  };

  $scope.getProblem = function() {
      var probId = getNextProblemId();
      Problems.getProblem(probId).then(function(d) {
        $scope.prob = d;
        $scope.prob.status = 'pending';
        $scope.prob.wordBank = getWordBank(d.wordBank);
        $scope.prob.codeLines = getProbCodeLines(d.code);
        $scope.correctAnswers = getCorrectAnswers(d.code);
        $scope.userAnswers = getUserAnswers($scope.correctAnswers.length);
      });
  };

  var getNextProblemId = function() {
    if ($scope.currentProblemNum > $scope.problems.length-1) {
        $location.path('/');
        //$scope.currentProblemNum = 0;
    } else {
        var id = $scope.problems[$scope.currentProblemNum]._id;
        $scope.currentProblemNum++;
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
      var curSubList = [];
      var wildcards = curLineStr.match(/\{\{((?!\}\})(?!\{\{).)+\}\}/g);
      if (wildcards) {
        var start = 0;
        for (var j in wildcards) {
          var wildcardIndex = curLineStr.search(wildcards[j]);
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

  $scope.popWord = function(index) {
    var val = $scope.userAnswers[index].pop();
    $scope.prob.wordBank.push(val);
  };

  $scope.submitCode = function(){
     if(checkAnswer()) {
        $scope.prob.status = 'solved';
        $('.alert').show().removeClass('alert-danger').addClass('alert-success').text('Good Job');
      } else {
        $('.alert').show().removeClass('alert-success').addClass('alert-danger').text('Incorrect! Check the test cases for clues as to what went wrong.');
      }
      setTimeout(function(){
        $('.alert').fadeOut();
      }, 2500);
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
  $scope.currentProblemNum = 0;
  $scope.getNextProblem();
  console.log('intializing controller');
};
init();


}); //end of controller
