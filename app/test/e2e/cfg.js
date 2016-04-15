exports.config = {
    allScriptsTimeout: 11000,
    framework: 'jasmine',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    seleniumArgs: ['-browserTimeout=60'],
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    specs: ['specs/*.js'],
    baseUrl: 'http://localhost:8080/',
    troubleshoot: false,
    multiCapabilities: [{
        'browserName': 'chrome'
    }, {
        'browserName': 'firefox'
    }],
    jasmineNodeOpts: {
        print: function(msg) {
            process.stdout.write(msg);
        },
        defaultTimeoutInterval: 30000,
        showColors: true,
        isVerbose: true,
        realtimeFailure: true,
        includeStackTrace: true
    },
    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter'),
            ScShReporter = require('./plugins/protractor-screenshoot-reporter/index.js');

        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all'
        }));
        jasmine.getEnv().addReporter(new ScShReporter({
            baseDirectory: "reports/screenshots",
            pathBuilder: function(spec, descriptions, results, capabilities) {
                console.log(capabilities.caps_.browser, descriptions.join('-'));
                return path.join(capabilities.caps_.browser, descriptions.join('-'));
            }
        }));
    }
}
