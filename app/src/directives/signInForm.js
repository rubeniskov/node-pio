define(['app'], function(app) {
    app.directive('signInForm', function($state) {
        return {
            templateUrl: 'partial/signInForm.html',
            controller: 'authCtrl',
            controllerAs: 'auth',
            bindToController: true,
            link: function($scope, $element, $attrs, $ctrls) {
                $scope.fields = 'CODE';

                $scope.change = function($event){
                    $scope.password &&
                    $scope.password.length === 4 &&
                    $scope.signIn();
                };

                $scope.signIn = function() {
                    $scope.loading = true;
                    $scope.auth.signIn($scope.id, $scope.password).then(function(){
                        $scope.loading = false;
                    }, function(){
                        $scope.loading = false;
                    });
                };
            }
        };
    });
});
