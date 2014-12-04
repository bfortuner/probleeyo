'use strict';

angular.module('probleeApp')
  .controller('HomeCtrl', function ($scope) {
        $scope.topics = [{
      'title': 'Strings',
      'link': '/problems/strings'
    },
    {
      'title': 'Lists',
      'link': '/problems/lists'
    },
    {
      'title': 'Functions',
      'link': '/problems/functions'
    }];


  });
