define(['app'], function(app){
    app.controller('authCtrl', ['authService', function (authService) {
        this.signIn = function(){
            authService.signIn(this.id, this.password);
        };

        this.signUp = function(){
            authService.signUp({
                id: this.id,
                password: this.password,
                email: this.email,
                name: {
                    first: this.firstname,
                    last: this.lastname
                }
            });
        };

        this.signOut = function(){
            authService.signOut();
        };
    }]);
});
