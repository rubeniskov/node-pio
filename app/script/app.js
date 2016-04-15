define([
    'angular',
    'angular-sanitize',
    'angular-resource',
    'angular-translate',
    'angular-ui-router',
    'angular-bootstrap',
    'angular-oclazyload',
    'angular-local-storage',
    'angular-md5',
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
            'angular-md5',
            'urlParser'
        ])
        .run(function($rootScope, $state) {
            $rootScope.$state = $state;

            $rootScope.$on('$stateChangeStart', function(e, to) {
                if (to.data && to.data.requiresLogin) {
                    if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                        e.preventDefault();
                        $state.go('login');
                    }
                }
            });
        });
});
