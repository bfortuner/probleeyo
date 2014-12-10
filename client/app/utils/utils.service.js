'use strict';

angular.module('probleeApp')
  .service('Utils', function () {
    return {
		curDate: function () {
		    var today = new Date();
	        var day = today.getDate();
	        var month = today.getMonth()+1;
	        var year = today.getFullYear();
		   return month + '/' + day + '/' + year; 
		},
		curTime: function () {
		   var today = new Date();
            var day = today.getDate();
            var month = today.getMonth();
            var year = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
            var second = today.getSeconds();
		   return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second; 
		},
		isoToDate: function (isoDate) {
		    var today = new Date(isoDate);
	        var day = today.getDate();
	        var month = today.getMonth()+1;
	        var year = today.getFullYear();
		   return month + '/' + day + '/' + year; 
		},

    };
});
