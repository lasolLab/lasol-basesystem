'use strict';

angular.module('Core').factory('userService', ['dataService',
  function (dataService) {
	  return {
		  login: function (user, password) {
			  return dataService.login(user, password);
		  }
	  };
  }
]);
