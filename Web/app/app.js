'use strict';

angular.module('BaseApp', ['Core', 'Login', 'Layout'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "layout/index.html"
            });
    })
    .run(['$rootScope', '$state', '$stateParams', '$cookieStore', '$http',
        function($rootScope, $state, $stateParams, $cookieStore, $http) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
                var restrictedPage = toState.name != 'login';
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        }
    ]);
