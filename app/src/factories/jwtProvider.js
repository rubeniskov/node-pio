define(['app'], function(app) {
    app.factory('jwtProvider', function(API_CONFIG, jwtHelper, localStorageService) {

        var header  = API_CONFIG.auth.header,
            factory = {
                getToken: function() {
                    return localStorageService.get(header);
                },
                setToken: function(token) {
                    return localStorageService.set(header, token);
                },
                removeToken: function() {
                    localStorageService.remove(header);
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
