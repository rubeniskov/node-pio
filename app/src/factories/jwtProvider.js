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
                    var token = factory.getToken();
                    return !token || jwtHelper.isTokenExpired(token);
                },
                decodeToken: function(){
                    return jwtHelper.decodeToken(factory.getToken());
                },
                getTokenExpirationDate: function(){
                    var token = factory.getToken();
                    return token ? jwtHelper.getTokenExpirationDate(token) : new Date();
                },
                getTokenEpirationTime: function(){
                    return Math.max(factory.getTokenExpirationDate().getTime() - new Date().getTime(), 0);
                }
            };
        return factory;
    });
});
