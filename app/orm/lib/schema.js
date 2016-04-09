const   driver      = require('mongoose');

module.exports = function(utils){
    var Schema = utils.inherits(driver.Schema, {
        __constructor: function(struct, statics, virtuals){
            this.statics = utils.extend(this.statics, statics);
            this.virtuals = utils.extend(this.virtuals, virtuals);
            this.__superApply(struct);
        }
    });

    return function(struct, statics, virtuals){
        return new Schema(struct, statics, virtuals);
    }
};
