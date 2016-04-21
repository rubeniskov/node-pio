define(['app', 'crypto-js'], function(app, crypto){
    app.service('authService', function (API_CONFIG, $q, apiService, jwtProvider) {

        var self = this;

        self.signIn = function (id, password) {
            return apiService.authenticate(crypto.AES.encrypt(JSON.stringify({
                id: id,
                password: password
            }), API_CONFIG.key).toString()).then(function(response){
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
    });
});
