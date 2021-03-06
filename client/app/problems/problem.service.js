'use strict';

angular.module('probleeApp')
  .service('Problems', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
	   getProblems: function() {
	     var url = '/api/problems';
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   },
	    getProblemsByTopic: function(topic) {
	     var url = '/api/problems/topic/' + topic;
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   },
	   	getShuffleProblems: function() {
	     var url = '/api/problems';
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   },
	   getProblem: function(problemId) {
	     var url = '/api/problems/' + problemId; 
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   },
	   deleteProblem: function(problemId) {
	     var url = '/api/problems/' + problemId; 
	     var promise = $http.delete(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   }
	};

  });
