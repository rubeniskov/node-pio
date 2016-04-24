define(['app'], function(app){
    app.service('authService', function ($q, authProvider, ioService) {

        var self = this;

        self.signIn = function (id, password) {
            return $q.when(authProvider.authenticate(id, password))
                        .then(function(){
                            return ioService.reconnect();
                        });
        };

        self.signOut = function (username, password) {
            return $q.when(authProvider.revoke())
                        .then(function(){
                            return ioService.disconnect();
                        });
        };

        self.isSigned = function(){
            true;
        };
    });
});
