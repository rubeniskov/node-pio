define(['app', 'crypto-js'], function(app, crypto) {
    app.factory('authProvider', function(API_CONFIG, API_URL, $http, $q, jwtProvider) {

        return {
            authenticate: function(id, password) {
                var deferred = $q.defer();
                $http.post(API_URL + '/authenticate', { hash: crypto.AES.encrypt(JSON.stringify({
                    id: id,
                    password: password
                }), API_CONFIG.key).toString()}).then(function(response){
                    jwtProvider.setToken(response.data.token);
                    deferred.resolve();
                }, deferred.reject);
                return deferred.promise;
            },
            revoke: function(){
                jwtProvider.removeToken();
                return $q.resolve();
            },
            isTokenExpired: jwtProvider.isTokenExpired,
            getTokenExpirationDate: jwtProvider.getTokenExpirationDate,
            getTokenEpirationTime: jwtProvider.getTokenEpirationTime
        }
    });
});
