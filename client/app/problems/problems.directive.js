'use strict';

angular.module('probleeApp')
  .directive('answerField', function() {
      return {
          restrict: 'E',
          scope: {
              pos: '=',
              answer: '=',
          },
          controller: 'ProblemsCtrl',
          templateUrl: 'app/problems/answerField.html',     
      };
  })
  .directive('wordBank', function() {
      return {
          restrict: 'E',
          scope: {
            wordbank: '=',
          },
          controller: 'ProblemsCtrl',
          templateUrl: 'app/problems/wordBank.html',     
      };
  });

