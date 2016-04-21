require([
    'angular',
    'app',
    'config',
    'factories',
    'services',
    'controllers',
    'components',
    'directives'
], function (angular, app) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, [app.name]);
    });
});
