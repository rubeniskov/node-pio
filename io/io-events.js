module.exports = function(server, cfg, options, cert) {
    return function(socket, next) {
        setInterval(function() {
            socket.emit('test', {
                'jajajaja': 'jur'
            });
        }, 5000);
        next();
    };
}
