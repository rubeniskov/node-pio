define(['app'], function(app) {
    app.controller('pollCreateCtrl', function($scope, pollProvider) {

        var self = this;

        self.title = '';

        self.notes = '';

        self.pollings = [];

        self.save = function(){
            pollProvider.create({
                title: self.title,
                notes: self.notes,
                pollings: self.pollings
            });
        };

        self.cancel = function(){
            console.log('cancel');
        };
    });
});
