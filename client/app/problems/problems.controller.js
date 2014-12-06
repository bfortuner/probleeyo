'use strict';

angular.module('probleeApp')
  .controller('ProblemsCtrl', function ($scope, $sce, $filter, Problems) {

  $scope.getNextProblem = function() {
    console.log("getting next problem: " + $scope.currentProblemNum);
    Problems.getProblems().then(function(d) {
      $scope.problems = d;
      //console.log(d);
  }).then( function() {
      $scope.problemId = getNextProblemId();

      Problems.getProblem($scope.problemId).then(function(d) {
        $scope.probStatus = 'pending';
        $scope.problem = d;
        $scope.probTitle = d.title;
        $scope.probTopic = d.topic;
        $scope.probDesc = d.description;
        $scope.probDiff = d.difficulty;
        $scope.probAuthor = d.author;
        $scope.probCodeLines = getProbCodeLines(d.code);
        $scope.wordBank = getProbWordBank(d.wordBank);
        $scope.correctAnswers = getCorrectAnswers(d.code);
        $scope.curAnswerPos = 0;
        //console.log('code'+ $scope.probCode);
        //console.log($scope.probWordBank);
        $scope.userAnswers = getUserAnswers($scope.correctAnswers.length);
        //console.log($scope.correctAnswers);

      });
    
    });

  };

  //load first problem
  $scope.getNextProblem();
  $scope.currentProblemNum = 0;
  var getNextProblemId = function() {
    var id = $scope.problems[$scope.currentProblemNum]._id;
    if ($scope.currentProblemNum >= $scope.problems.length-1) {
        $scope.currentProblemNum = 0;
    } else {
        $scope.currentProblemNum++;
    }
    return id;
  }

  var getCorrectAnswers = function(probCodeStr) {
      var correctAnswers = probCodeStr.match(/\{\{.+\}\}/g);
      for (var i=0; i<correctAnswers.length; i++) {
          correctAnswers[i] = correctAnswers[i].substring(correctAnswers[i].search('{{')+2, correctAnswers[i].search('}}'));
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
  }  

  var getProbWordBank = function(wordBank) {
      var newWordBank = [];
      var word;
      for (word in wordBank) {
        newWordBank.push({ 'title': wordBank[word], 'drag': true });
      }
      return newWordBank;
  };

  var getProbCodeLines = function(probCodeStr) {
    var codeLines = probCodeStr.split('\n');
    var lineCount = codeLines.length;
    var curWildcardIndex = 0;
    for (var i=0; i<lineCount; i++) {
      
      var subLine = codeLines[i].split(/\{\{.+\}\}/);;

      if (subLine.length == 1) {
        codeLines[i] = subLine;
      } else {
        var newSubLine = [];
        for (var j=0; j<subLine.length; j++) {
          console.log(newSubLine);
          if (j % 2 == 0 && j <subLine.length-1) {
            newSubLine.push(subLine[j]);
            newSubLine.push("{{W}}" + curWildcardIndex);
            curWildcardIndex++;
          } else {
            newSubLine.push(subLine[j]);
          }
        
        }
      codeLines[i] = newSubLine;
      }
    
    }

    return codeLines;
  }

  $scope.getSafeHtmlStr = function(str) {
     console.log("getting safe str");
     return $sce.trustAsHtml(str);
  }

  $scope.popWord = function(index) {
    var val = $scope.userAnswers[index].pop();
    $scope.wordBank.push(val);
  };

  $scope.problemComplete = false;

  $scope.submitAnswer = function(){
     if(checkAnswer()) {
        $scope.problemComplete = true;
        $scope.probStatus = 'solved';
        $('.alert').show().removeClass('alert-danger').addClass('alert-success').text('Good Job');
        $scope.getNextProblem();
      } else {
        $('.alert').show().removeClass('alert-success').addClass('alert-danger').text('Incorrect! Check the test cases for clues as to what went wrong.');
      }
      setTimeout(function(){
        $('.alert').fadeOut();
      }, 3000);
  };

  var checkAnswer = function(){
    $('.field').removeClass('has-error');
    var allCorrect = true;
    for(var i = 0; $scope.userAnswers[i]; i++){
      if(!$scope.userAnswers[i].submitted[0] ||
        ($scope.userAnswers[i].submitted[0].title !== $scope.userAnswers[i].correct)) {

        allCorrect = false;
        $('.field'+i).addClass('has-error');
      }
    }
    return allCorrect;
  };

  $scope.problemIndex = 0;


  $scope.showProblem = function(problemNum){
    $('.problemCode').hide();
    $('#problem' + problemNum).show();
    $scope.probWordBank = $scope.probWordBank[problemNum];
  };

  $('.alert').on('click', function(){
    $(this).hide();
  });


  });
