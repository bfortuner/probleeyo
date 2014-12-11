'use strict';

angular.module('probleeApp')
  .service('Users', function ($http) {

    return {
	   getUsers: function() {
	     var url = '/api/users';
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   },
	   getUser: function(userId) {
	     var url = '/api/users/' + userId; 
	     console.log(userId);
	     var promise = $http.get(url).then(function (response) {
	     console.log(promise);
		 return response.data;
	     });
	     return promise;
	   },
	   setSolved: function (solved) {
		    solved = $filter('json')(solved);
		    var promise = $http({
			method:'POST',
			url: '/api/solved',
			data: solved,
			headers: {'Content-Type': 'application/json'}
		    }).then(function (response) {
				return response.data;
		    });
		    return promise;
	  	},
	   getSolved: function(userId) {
	     var url = '/api/solved/' + userId; 
	     console.log(userId);
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   },
	   ,
	   getProblemSolved: function(userId, probId) {
	     var url = '/api/solved/problem/' + probId + "/" + userId; 
	     console.log(userId);
	     var promise = $http.get(url).then(function (response) {
		 return response.data;
	     });
	     return promise;
	   }     
	};
 
 });
