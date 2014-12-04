'use strict';

angular.module('probleeApp')
  .directive('auth', function() {
    return {
        restrict: 'E',
        replace: true,
	controller: 'AuthCtrl',
        templateUrl: 'components/auth/auth.html'
    };
});