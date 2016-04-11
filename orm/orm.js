const   fs          = require('fs'),
        path        = require('path'),
        utils       = require('../utils/utils.js'),
        models      = require('./lib/models.js')(utils)
        plugins     = require('./lib/plugins.js')(utils),
        driver      = require('./lib/driver.js')(utils),
        schema      = require('./lib/schema.js')(utils);

module.exports = function(options){
    var self = {}

    self.driver     = driver(options);
    self.schema     = schema;
    self.plugins    = plugins(self)(path.join(__dirname, 'plugins'), options.plugins);
    self.models     = models(self)(path.join(__dirname, 'models'), options.models);

    //console.log(self);

   return self;
}
