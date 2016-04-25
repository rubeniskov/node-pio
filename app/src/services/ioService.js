define(['app', 'underscore'], function(app, _){
    app.service('ioService', function ($q, ioProvider, jwtProvider) {

        var self = this;
        //     deferred = {
        //         connect: $q.defer(),
        //         disconnect: $q.defer()
        //     };
        //
        //     ioProvider.io
        //         .on('connect', function(){
        //             deferred.connect.resolve();
        //         })
        //         .on('disconnect', function(){
        //             deferred.disconnect.resolve();
        //         })
        //         .on('error', function(err) {
        //             deferred.connect.reject(err);
        //         });

        self.on = ioProvider.socket.on;
        self.emit = ioProvider.socket.emit;
        self.connect = ioProvider.connect;
        self.disconnect = ioProvider.disconnect;
        self.reconnect = ioProvider.reconnect;
        //function(opts){
            // if(ioProvider.io.connected)
            //     return $q.resolve();
            // ioProvider.io.io.opts = _.extend(ioProvider.io.io.opts, opts, {
            //     query: 'token=' + jwtProvider.getToken()
            // });
            // ioProvider.socket.connect()
            // return deferred.connect.promise;
        //};

        //self.disconnect = function(){
            // if(ioProvider.io.disconnected)
            //     return $q.resolve();
            // ioProvider.socket.disconnect(function(err){
            //     err ? deferred.disconnect.reject(err) : deferred.disconnect.resolve();
            // });
            // return deferred.disconnect.promise;
        //};

        //self.reconnect = function(){
            // return $q.when(self.disconnect())
            //             .then(function(){
            //                 return self.connect();
            //             });
        //};
    });
});
