'use strict';

angular.module('probleeApp')
  .service('Edit', function ($http, $filter) {
    return {
		editProblem: function (problem) {
			var probId = problem.id;
		    problem = $filter('json')(problem);
		    var promise = $http({
			method:'PUT',
			url: '/api/problems/' + probId,
			data: problem,
			headers: {'Content-Type': 'application/json'}
		    }).then(function (response) {
				return response.data;
		    });
		    return promise;
	  	}
   	};

 });
