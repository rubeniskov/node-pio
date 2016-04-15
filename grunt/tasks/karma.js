
module.exports = function(grunt, factory) {
    return {
        options: {
            configFile: "app/test/unit/cfg.js",
            seleniumConfig: {
                logLevel: 'DEBUG', // LOG_DEBUG,
                hostname: '<%= utils.getLocalhostAddress() %>',
                port: 4444,
                browser: {
                    hostname: '<%= utils.getSeleniumGatewayAddress() %>'
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
                singleRun: false,
                usePolling: true
            }
        }
    };
};
