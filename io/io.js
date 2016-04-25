const socketio = require("socket.io");


module.exports = function(server, cfg, options, cert) {
    return socketio(server)
        .use(require('./io-auth')(server, cfg, options, cert))
        .use(require('./io-events')(server, cfg, options, cert))
        .on('connection', function(socket) {
            console.log('hello! ');
        });
};
