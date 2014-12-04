'use strict';

angular.module('probleeApp')
  .directive('navBar', function() {
    return {
        restrict: 'E',
        replace: true,
	controller: 'NavbarCtrl',
        templateUrl: 'components/navbar/navbar.html'
    };
})