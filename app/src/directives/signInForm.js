define(['app'], function(app) {
    app.directive('signInForm', function($state) {
        return {
            templateUrl: 'partial/signInForm.html',
            controller: 'authCtrl',
            controllerAs: 'auth',
            bindToController: true,
            link: function($scope, $element, $attrs, $ctrls) {
                $scope.fields = 'CODE';
                $scope.signIn = function() {
                    $scope.auth.signIn($scope.id, $scope.password)
                        .then(function(){
                            $state.go('app.dashboard');
                        });
                };
            }
        };
    });
});
