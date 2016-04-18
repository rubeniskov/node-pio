const os = require('os'),
    path = require('path'),
    url = require('url'),
    _ = require('underscore'),
    jsmin = require('njsmin').jsmin,
    utils = _.extend({
        getSeleniumGatewayAddress: function() {
            var ifaces = os.networkInterfaces();
            return ifaces['docker0'] ?
                ifaces['docker0'][0].address :
                utils.getLocalhostAddress();
        },
        getLocalhostAddress: function() {
            var ifaces = os.networkInterfaces();
            return ifaces['lo'][0].address;
        },
        args: function(){
            return _.flatten(arguments);
        },
        getAbsolutePath: function(){
            return path.resolve.apply(null, utils.args(process.cwd(), arguments));
        },
        require: function(module){
            return require(/^(\.*\/)|\/|\.js$/.test(module) ? utils.getAbsolutePath(module) : module);
        },
        url: url,
        path: path,
        jsmin: jsmin
    }, _);

module.exports = utils;
