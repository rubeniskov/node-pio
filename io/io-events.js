module.exports = function(server, cfg, options, cert) {
    return function(socket, next) {
        //console.log(this, arguments);
        if(socket.connected){
            //socket.emit('user');
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
