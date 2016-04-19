define(['app', 'route', 'i18n'], function(app, route, i18n) {
    return app
        .constant('JWT_HEADER', 'x-access-token')
        .constant('API_URL', 'http://' + window.location.hostname + ':' + window.location.port + '/api')
        .config(function(
            $locationProvider,
            $stateProvider,
            $urlRouterProvider,
            $resourceProvider,
            $translateProvider,
            $httpProvider,
            localStorageServiceProvider,
            cfpLoadingBarProvider) {

            cfpLoadingBarProvider.includeSpinner = false;
            $resourceProvider.defaults.stripTrailingSlashes = false;

            $httpProvider.interceptors.push('jwtInterceptor');

            localStorageServiceProvider
                .setPrefix(app.name)
                .setStorageType('localStorage');

            route($stateProvider, $urlRouterProvider, $locationProvider);

            i18n($translateProvider);

        });
});
