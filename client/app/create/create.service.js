'use strict';

angular.module('probleeApp')
  .service('Create', function ($http, $filter) {
    return {
		createProblem: function (problem) {
		    problem = $filter('json')(problem);
		    var promise = $http({
			method:'POST',
			url: '/api/create',
			data: problem,
			headers: {'Content-Type': 'application/json'}
		    }).then(function (response) {
				return response.data;
		    });
		    return promise;
	  	}
   	};

 });
