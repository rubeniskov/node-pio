const socketioJwt = require("socketio-jwt");

module.exports = function(app, server, cfg, options, cert) {
    return function(socket, next) {
        return (socketioJwt.authorize({
            secret: cert.pub,
            handshake: true
        }))(socket, next);
    };
};
