'use strict';

angular.module('probleeApp')
  .directive('probCode', function() {
      return {
          restrict: 'E',
          scope: {
              ngModel: '=',
              pos: '=',
              prob: '=',
          },
          controller: 'ProblemsCtrl',
          templateUrl: 'app/problems/answerField.html',     
      };
  });