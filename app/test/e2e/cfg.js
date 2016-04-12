exports.config = {
    allScriptsTimeout: 11000,
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
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
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all'
        }));
    }
}
