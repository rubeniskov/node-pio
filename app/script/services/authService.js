define(['app'], function(app){
    app.service('authService', ['$q', 'apiService', 'md5', 'localStorageService', function ($q, apiService, md5, localStorageService) {

        var self = this;

        self.signIn = function (id, password) {
            return apiService.authenticate({
                id: id,
                password: md5.createHash(password)
            }).then(function(response){
                localStorageService.set('x-access-token', response.data.token);
            });
        };

        self.signUp = function (data) {
            return apiService.user.create(data);
        };

        self.signOut = function (username, password) {
                localStorageService.remove('x-access-token');
            return $q.resolve();
        };
    }]);
});
