require([
    'angular',
    'app',
    'config',
    'services',
    'controllers',
    'factories',
    'components',
    'directives'
], function (angular, app) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, [app.name]);
    });
});
