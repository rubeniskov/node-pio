const socketio = require("socket.io"),
    socketioJwt = require("socketio-jwt");


module.exports = function(server) {
    return socketio(server)
        .use(socketioJwt.authorize({
            secret: 'superSecret',
            handshake: true
        }))
        .on('connection', function(socket) {
            console.log('hello! ', socket);
        });
};
