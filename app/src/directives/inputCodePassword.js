define(['app', 'underscore'], function(app, _) {
    app.directive('inputCodePassword', ['$parse', function($parse) {
        return {
            replace: true,
            restrict: 'E',
            require: ['ngModel'],
            templateUrl: 'partial/inputCodePassword.html',
            scope: {
                fields: '=icpFields',
                placeholders: '=?icpPlaceholders'
            },
            controller: function($scope, $element) {

                $scope.parseFields = function(fields) {
                    if (_.isString(fields)) {
                        $scope._fields = new Array(fields.length);
                        $scope._placeholders = fields;
                    } else if (_.isNumber(fields)) {
                        $scope._fields = new Array(fields);
                    };
                };

                $scope.reset = function($event, $index) {
                    $scope._fields[$index] = null;
                };

                $scope.validate = function($event, $index) {
                    if ($event.keyCode >= 48 && $event.keyCode <= 57)
                        return true;
                    $event.preventDefault();
                };

                $scope.next = function($event, $index) {
                    if ($event.keyCode >= 48 && $event.keyCode <= 57) {
                        var nextinput = $element.find('input').eq(($index + 1) % 4);
                        if ($index !== 3) {
                            nextinput.focus();
                        } else {
                            angular.element(':focus').blur();
                        }
                    }
                };
            },
            link: function($scope, $element, $attrs, $ctrls) {
                var self = this,
                    model = $ctrls[0];

                $scope.$watch('_fields', function(ov, nv) {
                    nv && model.$setViewValue(nv.join(''));
                }, true);

                $scope.$watch('fields', function(ov, nv) {
                    nv && $scope.parseFields(nv);
                });
            }
        };
    }]);
});
