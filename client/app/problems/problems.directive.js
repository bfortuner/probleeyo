'use strict';

angular.module('probleeApp')
  .directive('probCode', function() {
      return {
          restrict: 'E',
          scope: {
              pos: '=',
              answer: '=',
          },
          controller: 'ProblemsCtrl',
          templateUrl: 'app/problems/answerField.html',     
      };
  });