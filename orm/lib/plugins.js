const   loader      = require('./loader.js');

module.exports = function(utils){
    return function(orm){
        return loader(utils, {
            _resolve: function(name, module){
                module = module(utils);
                if(module.expose){
                    utils.each(module.expose, function(fn, name){
                        fn && (orm[name] = fn);
                    });
                }
                if(module.plugin){
                    orm.driver.plugin(module.plugin);
                    return module.plugin;
                } else if(utils.isFunction(module)){
                    orm.driver.plugin(module);
                    return module;
                }
            }
        });
    }
}
