const
    EventEmitter = require('events'),
    util = require('util');

module.exports = function(app){
    return (function(emitter){
        emitter.on('user:created', function(user, password){
            app.em.sendPassword(user, password);
        });
        return emitter;
    })(((function(ev){
        util.inherits(ev, EventEmitter);
        return new ev;
    })(function() {
        EventEmitter.call(this);
    })));
};
