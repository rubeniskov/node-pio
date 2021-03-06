define(['app', 'moment'], function(app, moment){
    app.controller('langCtrl', function ($translate) {

        this.change = function(key){
            $translate.use(key);
            return this;
        };

        this.which = function(key){
            return key ? $translate.use() === key: $translate.use();
        };

        this.switch = function(){
            var lang = this.which('es') ? 'en' : 'es';
            moment.locale(lang)
            this.change(lang);
            return this;
        };
    });
});
