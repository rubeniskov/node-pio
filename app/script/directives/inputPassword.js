define(['app'], function(app) {
    app.directive('inputPassword', ['$parse', function($parse) {
        return {
            replace: true,
            restrict: 'E',
            require: ['ngModel'],
            template: function() {
                return '' +
                '<ul class="nav nav-pills nav-justified">' +
                    '<li ng-repeat="key in fields track by $index">' +
                        '<input type="password" maxlength="1" ' +
                            'class="form-control text-center" ' +
                            'ng-model="code[$index]" ' +
                            'ng-focus="reset($event, $index)" ' +
                            'ng-keydown="validate($event, $index)" ' +
                            'ng-keyup="next($event, $index)" ' +
                            'placeholder="{{key}}" ' +
                            'required="">' +
                    '</li>' +
                '</ul>';
            },
            link: function($scope, $element, $attrs, $ctrls) {
                var model = $ctrls[0],
                    form = $ctrls[1];

                $scope.fields = 'CODE'.split('');

                $scope.code = new Array($scope.fields.length);

                $scope.reset = function($event, $index){
                    $scope.code[$index] = null;
                };

                $scope.validate = function($event, $index){
                    if($event.keyCode >= 48 && $event.keyCode <= 57)
                        return true;
                    $event.preventDefault();
                };

                $scope.next = function($event, $index) {
                    if($event.keyCode >= 48 && $event.keyCode <= 57){
                        var nextinput = $element.find('input').eq(($index+1)%4);
                        if ($index !== 3) {
                            nextinput.focus();
                        } else {
                            angular.element(':focus').blur();
                        }
                    }
                };

                $scope.$watch('code', function(ov, nv){
                    model.$setViewValue($scope.code.join(''));
                }, true);
            }
        };
    }]);
});
