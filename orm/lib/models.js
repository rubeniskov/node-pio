const   loader      = require('./loader.js');

module.exports = function(utils){
    return function(orm){
        return loader(utils, {
            _resolve: function(name, module){
                return orm.driver.model(name,  module(orm.schema));
            }
        });
    }
}
