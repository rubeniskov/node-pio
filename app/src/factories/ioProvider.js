define(['app', 'socket-io'], function(app, io) {
    app.factory('ioProvider', function(socketFactory, jwtProvider) {
        return socketFactory({
            ioSocket: io.connect('http://' + window.location.hostname + ':' + window.location.port + '/', {
                'query': 'token=' + jwtProvider.getToken()
            }).on('error', function(error) {
                if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
                    // redirect user to login page perhaps?
                    console.log('User\'s token has expired');
                }
            })
        });
    });
});
