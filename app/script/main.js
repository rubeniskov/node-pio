require([
    'angular',
    'app',
    'config',
    'route',
    'services',
    'controllers',
    'components',
    'directives'
], function (angular, app) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, [app.name]);
    });
});
