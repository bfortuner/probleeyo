'use strict';

angular.module('probleeApp')
  .directive('footerBar', function() {
    return {
        restrict: 'E',
        replace: true,
	controller: 'FooterCtrl',
        templateUrl: 'components/footer/footer.html'
    };
});