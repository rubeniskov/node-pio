define(['app'], function(app) {
    app.factory('userProvider', function($resource, API_URL) {
        return $resource(API_URL + '/user/:id', {
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
    });
});
