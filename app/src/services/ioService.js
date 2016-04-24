define(['app', 'underscore'], function(app, _){
    app.service('ioService', function ($q, ioProvider, jwtProvider) {

        var self = this;

        self.on = function (){
            return ioProvider.socket.on.apply(ioProvider.socket, arguments);
        };

        self.emit = function () {
            return ioProvider.emit.apply(ioProvider.socket, arguments);
        };

        self.connect = function(opts){
            if(ioProvider.io.connected)
                return $q.resolve();
            var deferred = $q.defer();
            ioProvider.io.io.opts = _.extend(ioProvider.io.io.opts, opts, {
                query: 'token=' + jwtProvider.getToken()
            });
            ioProvider.socket.connect()
                .on('connect', function(){
                    deferred.resolve();
                })
                .on('error', function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        self.disconnect = function(){
            if(ioProvider.io.disconnected)
                return $q.resolve();
            var deferred = $q.defer();
            ioProvider.socket.disconnect(function(err){
                err ? deferred.reject(err) : deferred.resolve();
            })
            .on('disconnect', function(){
                deferred.resolve();
            });
            return deferred.promise;
        };

        self.reconnect = function(){
            return $q.when(self.disconnect())
                        .then(function(){
                            return self.connect();
                        });
        };

        self.on('authenticated', function(){
            console.log(arguments);
        });
    });
});
