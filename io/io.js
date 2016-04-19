const socketio = require("socket.io");


module.exports = function(server) {
    return socketio(server)
        .use(require('./io-auth'))
        .use(require('./io-events'))
        .on('connection', function(socket) {
            console.log('hello! ');
        });
};
