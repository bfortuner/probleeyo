'use strict';

angular.module('probleeApp')
  .directive('answerField', function() {
      return {
          restrict: 'E',
          scope: {
              pos: '=',
              answer: '=',
          },
          templateUrl: 'app/problems/answerField.html',     
      };
  })
  .directive('wordBank', function() {
      return {
          restrict: 'E',
          scope: {
            wordbank: '=',
          },
          templateUrl: 'app/problems/wordBank.html',     
      };
  });

