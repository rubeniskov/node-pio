// http://webapplog.com/tdd/
// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html

module.exports = function(grunt, factory) {
    return {
        options: {
            basePath: '',
            frameworks: ['jasmine', 'sinon-chai'],
            logLevel: 'DEBUG',
            files: [
                'app/dist/bundle.libs.js',
                'app/dist/bundle.main.js',
                'app/test/unit/specs/spec-*.js',
                'app/test/unit/plugins/karma-angular-bootstrap/index.js',
                'app/test/unit/plugins/karma-define-amd/index.js'
            ],
            reporters: ['progress', 'coverage'],
            preprocessors: {
                'app/build/main.js': ['coverage']
            },
            colors: true,
            autoWatch: true,
            captureTimeout: 60000,
            seleniumConfig: {
                hostname: '<%= utils.getLocalhostAddress() %>',
                port: 4444,
                browser: {
                    hostname: '<%= utils.getSeleniumGatewayAddress() %>'
                }
            },
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
            coverageReporter: {
                dir: 'app/test/unit/coverage/',
                reporters: [
                    { type: 'html', subdir: '.' },
                    { type: 'text-summary', subdir: '.', file: 'summary.txt' },
                    { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
                ]
            },
            browsers: ['chrome', 'firefox']
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
