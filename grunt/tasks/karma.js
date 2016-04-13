const os = require('os');
module.exports = function(grunt, data) {
    var ifaces = os.networkInterfaces();
    return {
        options: {
            configFile: "app/test/unit/cfg.js",
            seleniumConfig: {
                hostname: ifaces['lo'][0].address,
                port: 4444,
                browser: {
                    hostname: ifaces['docker0'][0].address
                }
            }
        },
        "ci-unit": {
            options: {
                autoWatch: false,
                singleRun: true
            }
        },
        "live-unit": {
            options: {
                autoWatch: true,
                singleRun: false
            }
        }
    };
};
