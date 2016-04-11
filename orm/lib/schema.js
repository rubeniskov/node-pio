const   driver      = require('mongoose');

module.exports = function(utils){
    var Schema = utils.inherits(driver.Schema, {
        __constructor: function(struct, options){
            this.statics = utils.extend(this.statics, options.statics);
            this.virtuals = utils.extend(this.virtuals, options.virtuals);
            this.__superApply(arguments);
        }
    });

    return function(struct, options){
        return new Schema(struct, options||{});
    }
};
