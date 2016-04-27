define(['app'], function(app) {
    app.controller('userCreateCtrl', function($rootScope, userProvider) {
        var self = this;

        self.user = {};

        self.save = function(){
            userProvider.create(self.user);
        };

        self.cancel = function(){
            $scope.userForm.$setPristine();
        };
    });
});
