'use strict';

angular.module('probleeApp')
  .service('Users', function ($http, $filter) {

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
	   }     
	};
 
 });
