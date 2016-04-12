module.exports = function(grunt, data) {
    return {
        options: {
            keepAlive: true,
            singleRun: false,
            configFile: "app/test/e2e/cfg.js"
        },
        "e2e": {
            options: {
                args: {
                }
            }
        }
    };
};
