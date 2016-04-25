define(['app'], function(app) {
    app.factory('pollProvider', function($resource, API_URL) {
        console.log(API_URL);
        return $resource(API_URL + '/poll/:id', {
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
