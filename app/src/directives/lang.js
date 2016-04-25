define(['app', 'underscore'], function(app, _) {
    app.directive('lang', function() {
        return {
            restrict: 'A',
            controller: 'langCtrl',
            controllerAs: 'lang'
        };
    });
});
