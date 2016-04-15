define(['app', 'route', 'i18n'], function(app, route, i18n) {
    return app
        .constant('JWT_HEADER', 'x-access-token')
        .constant('API_URL', 'http://' + window.location.hostname + ':8080/api')
        .config(function(
            $stateProvider,
            $urlRouterProvider,
            $resourceProvider,
            $translateProvider,
            $httpProvider,
            localStorageServiceProvider) {

            $resourceProvider.defaults.stripTrailingSlashes = false;

            $httpProvider.interceptors.push('jwtInterceptor');

            localStorageServiceProvider
                .setPrefix(app.name)
                .setStorageType('localStorage');

            route($stateProvider, $urlRouterProvider);

            i18n($translateProvider);

        });
});
