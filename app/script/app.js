define([
    'angular',
    'angular-sanitize',
    'angular-resource',
    'angular-translate',
    'angular-ui-router',
    'angular-bootstrap',
    'angular-oclazyload',
    'angular-local-storage',
    'angular-url-parser'
], function(angular) {
    return angular.module('pio', [
            'ngSanitize',
            'ngResource',
            'pascalprecht.translate',
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'LocalStorageModule',
            'urlParser'
        ])
        .run(function($rootScope, $state, jwtProvider) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeStart', function($event, to) {
                if (to.data && to.data.requiresLogin) {
                    if (jwtProvider.isTokenExpired()) {
                        $event.preventDefault();
                        $state.go('login');
                    }
                }
            });
        });
});
