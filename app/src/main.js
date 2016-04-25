require([
    'angular',
    'angular-deferred-bootstrap',
    'swal',
    'app',
    'config',
    'factories',
    'services',
    'controllers',
    'components',
    'directives'
], function(angular, deferred, swal, app) {
    angular.element(document).ready(function() {
        deferred.bootstrap({
            element: document,
            module: app.name,
            resolve: {
                API_CONFIG: ['$http', function($http) {
                    return $http.get('/api');
                }]
            },
            onError: function(error) {
                swal('Could not bootstrap, error: ' + error, 'error');
            }
        });
    });
});
