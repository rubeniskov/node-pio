define(['app', 'underscore'], function(app, _) {
    app.directive('inputTextStack', function($document, $timeout) {
        return {
            replace: true,
            restrict: 'E',
            require: ['ngModel'],
            templateUrl: 'partial/inputTextStack.html',
            scope: {
                placeholders: '=?itsData'
            },
            controller: function($scope, $element) {

                $scope.addItem = function() {
                    $scope._data.push({
                        title: '',
                        notes: ''
                    });
                };

                $scope.keyupHandler = function($event, $index) {
                    if ($event.keyCode === 13) {
                        $scope.addItem();
                        $timeout(function() {
                            $document.scrollToElement(
                                $element.find('input[type=text]').eq($index + 1).focus(), 15, 600
                            );
                        });
                    }
                };

                $scope.removeItem = function($event, $index) {
                    $scope._data.splice($index, 1);
                };

            },
            link: function($scope, $element, $attrs, $ctrls) {
                var self = this,
                    model = $ctrls[0];

                $scope._data = [];

                $scope.$watch(function(){
                    return model.$modelValue;
                }, function(nv, ov) {
                    nv && nv.length === 0 ? $scope.addItem() : $scope._data.concat(nv);
                });

                $scope.$watch('_data', function(nv, ov) {
                    model.$modelValue && (function(values) {
                        _.each(values, function(value, index) {
                            model.$modelValue[index] = value;
                        });
                    })(nv.filter(function(value) {
                        return value.title !== '';
                    }))
                }, true);
            }
        };
    });
});
