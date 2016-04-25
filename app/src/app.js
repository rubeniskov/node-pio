define(['angular',
    'angular-sanitize',
    'angular-resource',
    'angular-animate',
    'angular-translate',
    'angular-peity',
    'angular-loading-bar',
    'angular-jwt',
    'angular-ladda',
    'angular-ui-router',
    'angular-bootstrap',
    'angular-oclazyload',
    'angular-local-storage',
    'angular-url-parser',
    'angular-breadcrumb',
    'angular-datatables',
    'angular-socket-io',
    'angular-scroll'
], function(angular) {
    return angular.module('pio', [
            'ngSanitize',
            'ngResource',
            'ngAnimate',
            'pascalprecht.translate',
            'angular-peity',
            'angular-loading-bar',
            'angular-jwt',
            'angular-ladda',
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'LocalStorageModule',
            'urlParser',
            'ncy-angular-breadcrumb',
            'datatables',
            'btford.socket-io',
            'duScroll'
        ])
        .run(function($rootScope, $state, $timeout, authService) {

            $rootScope.$state = $state;

            $rootScope.$on('$authTokenExpired', function($event, auth){
                $timeout(function(){
                    $state.go('sign-in');
                }, 600);
            });

            $rootScope.$on('$authTokenProvided', function($event, auth){
                $timeout(function(){
                    $state.go($state.current, {}, {reload: true});
                }, 600);
            });

            $rootScope.$on('$stateChangeStart', function($event, to) {
                if (to.data) {
                    if (to.data.requiresLogin) {
                        if (!authService.isSigned()) {
                            $event.preventDefault();
                            $state.go('sign-in');
                        }
                    }
                    if (to.data.requiresAdmin) {
                        if(false){
                            $event.preventDefault();
                            $state.go('app.dashboard');
                        }
                    }
                }
            });
        });
});
