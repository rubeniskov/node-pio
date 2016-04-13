define(["app"], function(app){
    app.service('apiService', ['$http', function ($http) {

        var self = this,
            urlBase = '/api/user';

        self.createUser = function (data) {
            return $http.put(urlBase, data);
        };

        self.getUser = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        self.updateUser = function (id, data) {
            return $http.post(urlBase + '/' + id, data);
        };

        self.deleteUser = function (id) {
            return $http.delete(urlBase + '/' + id);
        };
    }]);
});
