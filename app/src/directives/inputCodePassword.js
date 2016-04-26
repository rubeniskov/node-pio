define(['app', 'underscore'], function(app, _) {
    app.directive('inputCodePassword', function($parse, $timeout) {
        return {
            replace: true,
            restrict: 'E',
            require: ['ngModel'],
            templateUrl: 'partial/inputCodePassword.html',
            scope: {
                fields: '=icpFields',
                placeholders: '=?icpPlaceholders',
                onChange: '&?icpChange'
            },
            controller: function($scope, $element) {

                $scope.values = [];

                $scope.parseFields = function(fields) {
                    if (_.isString(fields)) {
                        $scope._fields = new Array(fields.length);
                        $scope._placeholders = fields;
                    } else if (_.isNumber(fields)) {
                        $scope._fields = new Array(fields);
                    }
                };

                $scope.reset = function($event, $index) {
                    angular.forEach($scope.values, function(value, index){
                        $scope.values[index] = index >= $index  ? '' : value;
                    });
                };

                $scope.change = function() {
                    $scope.$emit('change', $scope.values);
                };

                $scope.validate = function($event, $index) {
                    if ($event.keyCode < 14 || $event.keyCode >= 48 && $event.keyCode <= 57)
                        return true;
                    $event.preventDefault();
                };

                $scope.next = function($event, $index) {
                    if ($event.keyCode >= 48 && $event.keyCode <= 57) {
                        var nextinput = $element.find('input').eq(($index + 1) % $scope.fields.length);
                        if ($index < $scope.fields.length) {
                            $timeout(function() {
                                nextinput.focus();
                            }, 1);
                        } else {
                            angular.element(':focus');
                        }
                    }
                };
            },
            link: function($scope, $element, $attrs, $ctrls) {
                var self = this,
                    model = $ctrls[0];

                $scope.$on('change', function($event, $value){
                    model.$setViewValue(($value=$value.join('')))
                    $scope.onChange({
                        $event: $event,
                        $value: $value
                    });
                });

                $scope.$watch('fields', function(nv, ov) {
                    nv && $scope.parseFields(nv);
                });
            }
        };
    });
});
