'use strict';

angular.module('probleeApp')
  .controller('TopicsCtrl', function ($scope, Topics) {
     
     Topics.getTopics().then(function(d) {
        $scope.topics = d;
        console.log(d);
     })

  });

    /*$scope.topics = [{
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
    },
    {
      'title': 'Loops',
      'link': '/problems/loops'
    },
    {
      'title': 'Logic',
      'link': '/problems/logic'
    },
    {
      'title': 'Recursion',
      'link': '/problems/recursion'
    }];
    */