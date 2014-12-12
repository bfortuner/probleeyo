'use strict';

angular.module('probleeApp')
  .service('Attempts', function ($http, $filter) {
	return {
	    createAttempt: function (attempt) {
		    attempt = $filter('json')(attempt);
		    console.log(attempt);
		    var promise = $http({
			method:'POST',
			url: '/api/attempts',
			data: attempt,
			headers: {'Content-Type': 'application/json'}
		    }).then(function (response) {
		      console.log(response.data);
		      return response.data;
		    });
		      return promise;
	  	},
	  	updateAttempt: function (attempt) {
	  		var attemptId = attempt._id;
		    attempt = $filter('json')(attempt);
		    var promise = $http({
			method:'PUT',
			url: '/api/attempts/' + attemptId,
			data: attempt,
			headers: {'Content-Type': 'application/json'}
		    }).then(function (response) {
		      console.log(response.data);
		      return response.data;
		    });
		      return promise;
	  	},
	    getProblemAttempts: function(userId, probId) {
	     	var url = '/api/attempts/problem/' + userId + '/' + probId; 
	     	var promise = $http.get(url).then(function (response) {
	     	console.log(response.data);
		 	return response.data;
	     });
	     	return promise;
	   },
	    getUserSolved: function(userId) {
	     	var url = '/api/attempts/solved/user/' + userId;
	     	var promise = $http.get(url).then(function (response) {
		 	return response.data;
	     });
	     	return promise;
	   }
	};
  });
