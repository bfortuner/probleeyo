'use strict';

angular.module('probleeApp')
  .controller('ProblemsCtrl', function ($scope, $sce, $filter, Problems) {

  var getNextProblem = function() {
    console.log("getting next problem");
    Problems.getProblems().then(function(d) {
      $scope.problems = d;
      console.log(d);
  }).then( function() {

      $scope.problemId = $scope.problems[0]._id;
      Problems.getProblem($scope.problemId).then(function(d) {
        $scope.probStatus = 'pending';
        $scope.problem = d;
        $scope.probTitle = d.title;
        $scope.probTopic = d.topic;
        $scope.probDesc = d.description;
        $scope.probDiff = d.difficulty;
        $scope.probAuthor = d.author;
        $scope.probCode = getProbCode(d.code);
        //$scope.probWordBank = getProbWordBank(d.wordBank);
        $scope.correctAnswers = getCorrectAnswers(d.code);
        //console.log('code'+ $scope.probCode);
        //console.log($scope.probWordBank);
        $scope.userAnswers = getUserAnswers($scope.correctAnswers.length);
        console.log($scope.correctAnswers);

      });
    
    });

  };

  //initialize first problem
  getNextProblem();

  var getCorrectAnswers = function(probCode) {
      var correctAnswers = probCode.match(/\{\{.+\}\}/g);
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

  var getProbCode = function(probCode) {
      var codeDivs = probCode.split('\n');
      //var i;
      //for (i=0; i<codeDivs.length; i++) {
      //    codeDivs[i] = $filter('code_html')(codeDivs[i]);
      //}
      return codeDivs;   
  }

  $scope.getSafeHtmlStr = function(str) {
     console.log("getting safe str");
     return $sce.trustAsHtml(str);
  }


$scope.wordBank = [
      { 'title': 'hello', 'drag': true },
      { 'title': 'return', 'drag': true },
      { 'title': 'do while', 'drag': true },
      { 'title': '===', 'drag': true },
      { 'title': '"hello"', 'drag': true },
      { 'title': '+=', 'drag': true },
      { 'title': 'var foo', 'drag': true },
      { 'title': 'function()', 'drag': true },
      { 'title': 'this.foo', 'drag': true },
    ];

  $scope.infoText = [
    'Using the variable foo, return the String "Hello"',
    'This function finds of index of "value" in "table." Drag in the missing part.  \ninput: [4,5,6,7], 6\noutput: 2',
    'Using the variable foo, return the String "Hello"',
  ];


  $scope.popWord = function(index) {
    console.log(index);
    console.log($scope.userAnswers);
    console.log($scope.userAnswers[index]);
    var val = $scope.userAnswers[index].pop();
    console.log(val);
    $scope.wordBank.push(val);
    console.log($scope.wordBank);
  };

  $scope.problemComplete = false;

  $scope.submitAnswer = function(){
    if($scope.problemComplete){
      $scope.showNextProblem();
    } else {
      if(checkAnswer()) {
        $scope.problemComplete = true;
        $scope.probStatus = 'solved';
        $('.alert').show().removeClass('alert-danger').addClass('alert-success').text('Good Job');
        $('#submit').text('Next Problem');
        $('#skip').hide();
      } else {
        $('.alert').show().removeClass('alert-success').addClass('alert-danger').text('Incorrect! Check the test cases for clues as to what went wrong.');
      }
      setTimeout(function(){
        $('.alert').fadeOut();
      }, 6000);
    }
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

  $scope.showNextProblem = function(){
    $('#submit').text('Submit');
    $('#skip').show();
    $('.field').removeClass('has-error');
    $('.alert').hide();
    $scope.problemComplete = false;
    $scope.problemIndex ++;
    if($scope.problemIndex >= $scope.fieldData.length) {
      $scope.problemIndex = 0;
    }
    $scope.showProblem($scope.problemIndex);
  };

  $scope.showProblem = function(problemNum){
    $('.problemCode').hide();
    $('#problem' + problemNum).show();
    $scope.probWordBank = $scope.probWordBank[problemNum];
  };

  $('.alert').on('click', function(){
    $(this).hide();
  });


  });
