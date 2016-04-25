define(['app'], function(app){
    app.service('authService', function ($q, $rootScope, $timeout, authProvider, ioService) {

        var self = this;

        self.signIn = function (id, password) {
            return $q.when(authProvider.authenticate(id, password), ioService.reconnect())
                        .then(function(){
                            $rootScope.$emit('$authTokenProvided');
                        });
        };

        self.signOut = function (username, password) {
            return $q.when(authProvider.revoke(), ioService.disconnect())
                        .then(function(){
                            $rootScope.$emit('$authTokenExpired');
                        });
        };

        self.isSigned = function(){
            return !authProvider.isTokenExpired();
        };

        $timeout(function(){
            $rootScope.$emit('$authTokenExpired');
        }, authProvider.getTokenEpirationTime());
    });
});
