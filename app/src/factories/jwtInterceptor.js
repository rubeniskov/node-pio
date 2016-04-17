define(['app'], function(app) {
    app.factory('jwtInterceptor', ['$q', 'localStorageService', 'jwtProvider', 'JWT_HEADER', function($q, localStorageService, jwtProvider, JWT_HEADER) {
        return {
            'request': function(config) {
                config.headers[JWT_HEADER] = jwtProvider.getToken();
                return config;
            },
            'requestError': function(rejection) {
                console.log(rejection);
                // // do something on error
                // if (canRecover(rejection)) {
                //     return responseOrNewPromise
                // }
                return $q.reject(rejection);
            },
            'response': function(response) {
                // // do something on success
                return response;
            },
            'responseError': function(rejection) {
                console.log(rejection);
                // // do something on error
                // if (canRecover(rejection)) {
                //     return responseOrNewPromise
                // }
                return $q.reject(rejection);
            }
        };
    }]);
});
