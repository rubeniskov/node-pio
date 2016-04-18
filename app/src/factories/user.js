define(['app'], function(app) {
    app.factory('User', ['$resource', function($resource) {
        return $resource('http://' + window.location.hostname + ':8080/api/user/:id', {
            id: '@id'
        }, {
            create:   {
                method:'PUT'
            },
            read: {
                method: 'GET'
            },
            update: {
                method: 'POST'
            },
            delete: {
                method: 'DELETE'
            }
        }, {
            stripTrailingSlashes: false
        });
    }]);
});
