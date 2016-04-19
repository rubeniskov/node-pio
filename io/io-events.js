
module.exports = function(socket, next) {
    setInterval(function(){
        socket.emit('test', {'jajajaja': 'jur'});
    }, 5000);

    next();
};
