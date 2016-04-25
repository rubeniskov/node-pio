module.exports = function(utils) {
    return {
        plugin: function(schema, options) {
            schema.add({
                at: {
                    c: {
                        type: Date,
                        default: Date.now
                    },
                    u: {
                        type: Date,
                        default: Date.now
                    }
                }
            }, '__');

            schema.pre('save', function(next) {
                this.__at.u = new Date();
                next();
            });
        }
    }
}
