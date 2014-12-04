'use strict';

angular.module('probleeApp')
  .controller('ProblemsCtrl', function ($scope) {

  $scope.fieldData = [
      [
      {'submitted':[],
      'correct':'"hello"' },
      {'submitted':[],
      'correct':'return' }
      ],

      [
      {'submitted':[],
      'correct':'table.length' }
      ],

      [
      {'submitted':[],
      'correct':'var' },
      {'submitted':[],
      'correct':'foo' },
      {'submitted':[],
      'correct':'"hello"' },
      {'submitted':[],
      'correct':'return' }
      ],
  ];
  $scope.infoText = [
    'Using the variable foo, return the String "Hello"',
    'This function finds of index of "value" in "table." Drag in the missing part.  \ninput: [4,5,6,7], 6\noutput: 2',
    'Using the variable foo, return the String "Hello"',
  ];
  $scope.wordBankData = [
    [
      { 'title': 'hello', 'drag': true },
      { 'title': 'return', 'drag': true },
      { 'title': 'do while', 'drag': true },
      { 'title': '===', 'drag': true },
      { 'title': '"hello"', 'drag': true },
      { 'title': '+=', 'drag': true },
      { 'title': 'var foo', 'drag': true },
      { 'title': 'function()', 'drag': true },
      { 'title': 'this.foo', 'drag': true },
    ],
    [
      { 'title': 'value2', 'drag': true },
      { 'title': 'table', 'drag': true },
      { 'title': 'table.length', 'drag': true },
      { 'title': 'value', 'drag': true },
      { 'title': 'i', 'drag': true },
      { 'title': '10', 'drag': true },
      { 'title': 'this', 'drag': true },
    ],
    [
      { 'title': 'return', 'drag': true },
      { 'title': 'var', 'drag': true },
      { 'title': 'foo', 'drag': true },
      { 'title': 'this', 'drag': true },
      { 'title': '"hello"', 'drag': true },
      { 'title': '"hello"', 'drag': true },
      { 'title': 'function()', 'drag': true },
      { 'title': 'hello', 'drag': true },
      { 'title': 'this.foo', 'drag': true },
    ]
  ];

  $scope.problemIndex = 0;

  $scope.answerFields = $scope.fieldData[$scope.problemIndex];
  $scope.wordBank = $scope.wordBankData[$scope.problemIndex];

  $scope.popWord = function(index) {
    var val = $scope.answerFields[index].submitted.pop();
    $scope.wordBank.push(val);
  };

  $scope.problemComplete = false;

  $scope.submitAnswer = function(){
    if($scope.problemComplete){
      $scope.showNextProblem();
    } else {
      if(checkAnswer()) {
        $scope.problemComplete = true;
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
    for(var i = 0; $scope.answerFields[i]; i++){
      if(!$scope.answerFields[i].submitted[0] ||
        ($scope.answerFields[i].submitted[0].title !== $scope.answerFields[i].correct)) {

        allCorrect = false;
        $('.field'+i).addClass('has-error');
      }
    }
    return allCorrect;
  };

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
    $scope.answerFields = $scope.fieldData[problemNum];
    $scope.wordBank = $scope.wordBankData[problemNum];
  };

  $('.alert').on('click', function(){
    $(this).hide();
  });


  });
