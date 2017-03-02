'use strict';

angular.module('Login', ['Core'])
    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'login/index.html'
            })
            .state('logout', {
                url: '/logout',
                controller: ['authenticationService', '$state',
                    function(authenticationService, $state) {
                        authenticationService.logout();
                        $state.go('login');
                    }]
            })
    });

