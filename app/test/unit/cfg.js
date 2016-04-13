module.exports = function(config) {
    config.set({
        port: 9876,
        hostname: 'localhost',
        colors: true,
        autoWatch: true,
        singleRun: false,
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['progress', 'mocha', 'html'],
        files: [
            '../../dist/main.js',
            '../../lib/angular-mocks.js',
            'specs/spec-*.js'
        ],
        plugins: [
            'karma-mocha',
            'karma-sinon-chai',
            'karma-selenium-webdriver',
            'karma-mocha-reporter',
            'karma-htmlfile-reporter'
        ],
        customLaunchers: {
            'chrome': {
                browserName: 'chrome',
                base: 'SeleniumWebDriver'
            },
            'firefox': {
                browserName: 'firefox',
                base: 'SeleniumWebDriver'
            }
        },
        mochaReporter: {
            colors: {
                success: 'blue',
                info: 'bgGreen',
                warning: 'cyan',
                error: 'bgRed'
            }
        },
        htmlReporter: {
            outputFile: 'reports/report.html',
            pageTitle: 'Unit Tests'
        },
        mochaNodeOpts: {
            defaultTimeoutInterval: 30000,
            showColors: true,
            isVerbose: true,
            realtimeFailure: true,
            includeStackTrace: true
        },
        browsers: ['chrome', 'firefox']
    });
};
