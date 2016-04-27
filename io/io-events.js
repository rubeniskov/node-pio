module.exports = function(app, server, cfg, options, cert) {
    return function(socket, next) {
        app.ev.on('user:created', function(){

        });
        if(socket.connected){
            //console.log(socket.handshake.decoded_token);
            socket.join('admin')
            socket.broadcast.to('admin').emit('user', { some: 'data' });
        }
            //socket.join('admin');
            //socket.to('admin').emit('user', { some: 'data' });
            //socket.emit('user', { some: 'data' })
        next();
    };
}
