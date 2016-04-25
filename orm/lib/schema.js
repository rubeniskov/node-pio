const driver = require('mongoose');

module.exports = function(utils) {
    var Schema = utils.inherits(driver.Schema, {
        __constructor: function(struct, options) {
            var self = this;
            self.statics = utils.extend(self.statics, options.statics);
            self.__superApply(arguments);
            utils.each(options.virtuals, function(fn, name) {
                // if (fn) {
                //     fn.get && self.virtual(name).get(fn);
                //     fn.set && self.virtual(name).set(fn);
                //     fn.apply && self.virtual(name).get(fn);
                // }
            });
        }
    });

    return function(struct, options) {
        return new Schema(struct, options || {});
    }
};
