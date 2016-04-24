define(['app', 'socket-io'], function(app, io) {
    app.factory('ioProvider', function(socketFactory, jwtProvider) {

        var _io = io.connect('http://' + window.location.hostname + ':' + window.location.port + '/', {
            'query': 'token=' + jwtProvider.getToken(),
            'reconnection delay': 1000,
            'reconnection limit': 1000,
            'max reconnection attempts': 'Infinity'
        })
        .on('connect', function(socket){
            console.log('IO - Connection');
        })
        .on('error', function(error) {
            if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
                // redirect user to login page perhaps?
                console.log('User\'s token has expired');
            }
        });

        return {
            io: _io,
            socket: socketFactory({
                ioSocket: _io
            })
        }
    });
});
