define(['app'], function(app){
    app.controller('authCtrl', function ($state, authService) {

        this.signIn = function(id, password){
            return authService.signIn(id, password);
        };

        this.signUp = function(id, password){
            return authService.signUp({
                id: id,
                password: password,
                email: this.email,
                name: {
                    first: this.firstname,
                    last: this.lastname
                }
            });
        };

        this.signOut = function(){
            authService.signOut().then(function(){
                $state.go('sign-in')
            });
        };
    });
});
