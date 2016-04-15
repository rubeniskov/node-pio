define(['app', 'crypto-js'], function(app, crypto){
    app.service('authService', ['$q', 'apiService', 'jwtProvider', function ($q, apiService, jwtProvider) {

        var self = this;

        self.signIn = function (id, password) {
            return apiService.authenticate({
                id: id,
                password: crypto.HmacSHA1(password, 'secret')
            }).then(function(response){
                jwtProvider.setToken(response.data.token);
            });
        };

        self.signUp = function (data) {
            return apiService.user.create(data);
        };

        self.signOut = function (username, password) {
                jwtProvider.removeToken();
            return $q.resolve();
        };
    }]);
});
