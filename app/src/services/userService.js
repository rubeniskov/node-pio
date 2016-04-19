define(['app'], function(app){
    app.service('userService', function ($resource, API_URL) {

        var self = this,
            User = $resource(API_URL+'/user/:id', {id:'@id'});

        // self.createUser = function (data) {
        //     return $User.put(urlBase, data);
        // };
        //
        // self.getUser = function (data) {
        //     return User;
        // };
        //
        // self.user = ;
        //
        // self.updateUser = function (id, data) {
        //     return $http.post(urlBase + '/user/' + id, data);
        // };
        //
        // self.deleteUser = function (id) {
        //     return $http.delete(urlBase + '/' + id);
        // };
        //
        // self.authenticate = function(id) {
        //     return $http.delete(urlBase + '/authenticate' + id);
        // };
    });
});
