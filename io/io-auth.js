const socketioJwt = require("socketio-jwt");

module.exports = function(socket, next){
    return (socketioJwt.authorize({
        secret: 'superSecret',
        handshake: true
    }))(socket, next);
}
