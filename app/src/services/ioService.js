define(['app'], function(app){
    app.service('ioService', function (ioProvider) {

        var self = this;

        self.on = function (){
            return ioProvider.on.apply(ioProvider, arguments);
        };

        self.emit = function () {
            return ioProvider.emit.apply(ioProvider, arguments);
        };
    });
});
