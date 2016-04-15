define(['app', 'route', 'i18n'], function(app, route, i18n) {
    return app
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
