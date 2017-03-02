'use strict';

angular.module('Core').factory('authenticationService', ['$http', '$cookieStore', '$rootScope', '$timeout', 'userService',
    function ($http, $cookieStore, $rootScope, $timeout, userService) {
        return {
            login: function (username, password, onSuccess, onError) {
                $timeout(function () {
                    userService.login(username, password)
                        .then(onSuccess)
                        .catch(onError);
                }, 1000);
            },
            setCredentials: function (username, password) {
                var authdata = Base64.encode(username + ':' + password);
                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            },
            clearCredentials: function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';
            },
            logout: function () {
                var self = this;
                self.clearCredentials();
            },
            isAuthenticated: function () {
                var currentUser = $rootScope.globals.currentUser;
                return (currentUser != null);
            },
            getCurrentUsername: function () {
                var currentUser = $rootScope.globals.currentUser;
                return (currentUser != null && currentUser.username) ? currentUser.username : '';
            }
        }
    }
]);
