define(['app'], function(app){
    app.controller('langCtrl', function ($translate) {

        this.change = function(key){
            $translate.use(key);
            return this;
        };

        this.which = function(key){
            return key ? $translate.use() === key: $translate.use();
        };

        this.switch = function(){
            this.change(this.which('es') ? 'en' : 'es');
            return this;
        };
    });
});
