const   loader      = require('./loader.js');

module.exports = function(utils){
    return function(orm){
        return loader(utils, {
            _resolve: function(name, module){
                if(module.plugin){
                    orm.driver.plugin(module.plugin);
                    module[name] && (orm[name] = module[name]);
                    return module.plugin;
                } else if(utils.isFunction(module)){
                    orm.driver.plugin(module);
                    return module;
                }
            }
        });
    }
}
