define(['angular',
    'angular-sanitize',
    'angular-resource',
    'angular-animate',
    'angular-translate',
    'angular-peity',
    'angular-loading-bar',
    'angular-jwt',
    'angular-ui-router',
    'angular-bootstrap',
    'angular-oclazyload',
    'angular-local-storage',
    'angular-url-parser',
    'angular-breadcrumb',
    'angular-datatables',
    'angular-socket-io'
], function(angular) {
    return angular.module('pio', [
            'ngSanitize',
            'ngResource',
            'ngAnimate',
            'pascalprecht.translate',
            'angular-peity',
            'angular-loading-bar',
            'angular-jwt',
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'LocalStorageModule',
            'urlParser',
            'ncy-angular-breadcrumb',
            'datatables',
            'btford.socket-io'
        ])
        .run(function($rootScope, $state, jwtProvider) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeStart', function($event, to) {

                if (to.data) {
                    if (to.data.requiresLogin) {
                        if (jwtProvider.isTokenExpired()) {
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
