'use strict';

angular.module('probleeApp')
  .service('Topics', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
       return {
	   getTopics: function() {
	     var url = "/api/topics"
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   }
      };

  });
