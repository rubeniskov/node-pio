const socketio = require("socket.io");


module.exports = function(app, server, cfg, options, cert) {
    return socketio(server)
        .use(require('./io-auth')(app, server, cfg, options, cert))
        .use(require('./io-events')(app, server, cfg, options, cert))
        .on('connection', function(socket) {
            console.log('hello! ');
        });
};
