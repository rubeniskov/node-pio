define(['app', 'route', 'i18n'], function(app, route, i18n) {
    return app
        .constant('JWT_HEADER', 'x-access-token')
        .constant('API_URL',
            window.location.protocol +'//' +
            window.location.host + '/api')
        .config(function(
            $locationProvider,
            $stateProvider,
            $urlRouterProvider,
            $resourceProvider,
            $translateProvider,
            $httpProvider,
            jwtInterceptorProvider,
            localStorageServiceProvider,
            cfpLoadingBarProvider) {

            cfpLoadingBarProvider.includeSpinner = false;
            $resourceProvider.defaults.stripTrailingSlashes = false;

            $httpProvider.interceptors.push('jwtInterceptor');

            localStorageServiceProvider
                .setPrefix(app.name)
                .setStorageType('localStorage');

            jwtInterceptorProvider.tokenGetter = function(jwtProvider) {
                return jwtProvider.getToken();
            };

            route($stateProvider, $urlRouterProvider, $locationProvider);

            i18n($translateProvider);

        });
});
