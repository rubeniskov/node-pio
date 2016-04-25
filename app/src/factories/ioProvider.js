define(['app', 'socket-io'], function(app, io) {
    app.factory('ioProvider', function($q, socketFactory, jwtProvider) {

        var self,
            deferred = {
                connect: $q.defer(),
                disconnect: $q.defer()
            },
            socket = io.connect('http://' + window.location.hostname + ':' + window.location.port + '/',
            {
                'query': {
                    token: ''
                },
                'reconnection delay': 1000,
                'reconnection limit': 1000,
                'max reconnection attempts': 'Infinity'
            })
            .on('connect', function(socket){
                deferred.connect.resolve();
            })
            .on('disconnect', function(socket){
                deferred.disconnect.resolve();
            })
            .on('error', function(err) {
                deferred.connect.reject(err)
                // if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
                //     console.log('User\'s token has expired');
                // }
            });
        // var _io =
        // .on('connect', function(socket){
        //     console.log('IO - Connection');
        // })
        // .on('error', function(error) {
        //     if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
        //         console.log('User\'s token has expired');
        //     }
        // });
        //
        // var io = {
        //     socket: socketFactory({
        //         ioSocket: _io
        //     }),
        //     connect: function(){
        //         io.connect('http://' + window.location.hostname + ':' + window.location.port + '/', {
        //             'query': {
        //                 token: jwtProvider.getToken()
        //             },
        //             'reconnection delay': 1000,
        //             'reconnection limit': 1000,
        //             'max reconnection attempts': 'Infinity'
        //         })
        //     },
        //     disconnect: function(){
        //     jwtProvider.getToken()
        //     }
        // }
        return (self = {
            io: socket,
            socket: socketFactory({
                ioSocket: socket
            }),
            connect: function(opts){
                _.extend(socket.io.opts, opts, {
                    query: {
                        token : jwtProvider.getToken()
                    }
                });
                socket.io.open(function(err){
                    console.log('connectd')
                    err ? deferred.connect.reject(err) : deferred.connect.resolve();
                })
                return deferred.connect.promise;
            },
            disconnect: function(){
                socket.io.close(function(err){
                    console.log('DISCONN');
                    err ? deferred.disconnect.reject(err) : deferred.disconnect.resolve();
                });
                return deferred.disconnect.promise;
            },
            reconnect: function(){
                return $q.when(self.disconnect(), self.connect());
            }
        });
    });
});
