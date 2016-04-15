const os = require('os'),
    utils = {
        getSeleniumGatewayAddress: function() {
            var ifaces = os.networkInterfaces();
            return ifaces['docker0'] ?
                ifaces['docker0'][0].address :
                utils.getLocalhostAddress();
        },
        getLocalhostAddress: function(){
            var ifaces = os.networkInterfaces();
            return ifaces['lo'][0].address;
        }
    }

module.exports = utils;
