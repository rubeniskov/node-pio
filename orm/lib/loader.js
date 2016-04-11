const   fs          = require('fs'),
        path        = require('path'),
        jsext       = /\.js$/;

module.exports = function(utils, extended){
    return function(location, includes){
        var inc     = utils.isArray(includes) ? includes : []
            self    = utils.extend(function(name){
            return this._get(name);
        }, {
            _get: function(){
                return this[name];
            },
            _set: function(name, model){
                this[name] = model;
                return this;
            },
            _load: function(){
                var self = this,
                    mod;
                utils.each(fs.readdirSync(location), function(file){
                    var name = file.replace(jsext, '');
                    jsext.test(file) &&
                    (!inc.length || utils.contains(inc, name)) &&
                        (mod = self._resolve(name, require(path.join(location, file), file))) &&
                            self._set(name, mod);
                });
                return this;
            }
        }, extended)._load();

        return self;
    }
}
