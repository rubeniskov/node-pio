module.exports = function(grunt, data) {
    return {
        options: {
            configFile: "app/test/e2e/cfg.js"
        },
        "ci-e2e": {
            options: {
                autoWatch: false,
                singleRun: true,
                args: {}
            }
        },
        "live-e2e": {
            options: {
                autoWatch: true,
                singleRun: false,
                args: {}
            }
        }
    };
};
