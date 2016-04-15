define(['app'], function(app) {
    app.factory('jwtInterceptor', ['$q', 'localStorageService', function($q, localStorageService) {
        return {
            'request': function(config) {
                config.headers['x-access-token'] = localStorageService.get('x-access-token');
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
