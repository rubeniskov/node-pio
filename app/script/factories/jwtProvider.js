define(['app'], function(app) {
    app.factory('jwtProvider', ['$q', 'localStorageService', 'JWT_HEADER', function($q, localStorageService, JWT_HEADER) {
        return {
            getToken: function(){
                return localStorageService.get(JWT_HEADER);
            },
            setToken: function(token){
                return localStorageService.set(JWT_HEADER, token);
            },
            removeToken: function(){
                localStorageService.remove(JWT_HEADER);
            },
            isTokenExpired: function(){
                !!localStorageService.get(JWT_HEADER);
            }
        };
    }]);
});
