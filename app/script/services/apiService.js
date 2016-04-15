define(['app'], function(app) {
    app
        .constant('API_URL', 'http://' + window.location.hostname + ':8080/api')
        .service('apiService', ['$http', 'API_URL', function($http, API_URL) {
            var self = this;

            self.authenticate = function(data) {
                return $http.post(API_URL + '/authenticate', data);
            };
        }]);
});
