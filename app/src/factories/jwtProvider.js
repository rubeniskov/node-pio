define(['app'], function(app) {
    app.factory('jwtProvider', function(JWT_HEADER, jwtHelper, localStorageService) {

        var factory = {
            getToken: function() {
                return localStorageService.get(JWT_HEADER);
            },
            setToken: function(token) {
                return localStorageService.set(JWT_HEADER, token);
            },
            removeToken: function() {
                localStorageService.remove(JWT_HEADER);
            },
            isTokenExpired: function() {
                return !factory.getTokenExpirationDate() || jwtHelper.isTokenExpired(factory.getToken());
            },
            decodeToken: function(){
                return jwtHelper.decodeToken(factory.getToken());
            },
            getTokenExpirationDate: function(){
                var token = factory.getToken();
                return !!token && jwtHelper.getTokenExpirationDate(token);
            }
        };
        return factory;
    });
});
