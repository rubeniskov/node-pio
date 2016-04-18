define(['app', 'underscore'], function(app, _) {
    app.directive('markdownEditor', function() {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                $(element).markdown({
                    savable: false,
                    onChange: function(e) {
                        ngModel.$setViewValue(e.getContent());
                    }
                });
            }
        };
    });
});
