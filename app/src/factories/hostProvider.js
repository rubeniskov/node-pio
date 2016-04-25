define(['app'], function(app) {
    app.factory('hostProvider', function($resource, API_URL) {
        return $resource(API_URL + '/host/:id', {
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
