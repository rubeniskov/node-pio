module.exports = function(grunt, factory) {
    var dist = Object.keys(factory.app.config.build.js)[0],
        source = factory.app.config.build.js[dist];

    var libs = {
            'angular': '../lib/angular/angular',
            'angular-mocks': '../lib/angular-mocks/angular-mocks',
            'angular-peity': '../lib/angular-peity/angular-peity',
            'angular-breadcrumb': '../lib/angular-breadcrumb/dist/angular-breadcrumb',
            'angular-translate': '../lib/angular-translate/angular-translate',
            'angular-animate': '../lib/angular-animate/angular-animate',
            'angular-resource': '../lib/angular-resource/angular-resource',
            'angular-aria': '../lib/angular-aria/angular-aria',
            'angular-url-parser': '../lib/angular-url-parser/dist/angular-url-parser',
            'angular-bootstrap': '../lib/angular-bootstrap/ui-bootstrap',
            'angular-deferred-bootstrap': '../lib/angular-deferred-bootstrap/angular-deferred-bootstrap',
            'angular-messages': '../lib/angular-messages/angular-messages',
            'angular-resource': '../lib/angular-resource/angular-resource',
            'angular-sanitize': '../lib/angular-sanitize/angular-sanitize',
            'angular-socket-io': '../lib/angular-socket-io/socket',
            'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
            'angular-jwt': '../lib/angular-jwt/dist/angular-jwt',
            'angular-oclazyload': '../lib/oclazyload/dist/ocLazyLoad',
            'angular-local-storage': '../lib/angular-local-storage/dist/angular-local-storage',
            'angular-datatables': '../lib/angular-datatables/dist/angular-datatables',
            'angular-loading-bar': '../lib/angular-loading-bar/build/loading-bar',
            'datatables': '../lib/datatables/media/js/jquery.dataTables',
            'almond': '../lib/almond/almond',
            'bootstrap-markdown': '../lib/bootstrap-markdown/js/bootstrap-markdown',
            'underscore': '../lib/underscore/underscore',
            'jquery': '../lib/jquery/dist/jquery',
            'jquery': '../lib/jquery/dist/jquery',
            'peity': '../lib/peity/jquery.peity',
            'moment': '../lib/moment/min/moment-with-locales',
            'swal': '../lib/sweetalert/dist/sweetalert-dev',
            'pace': '../lib/pace/pace',
            'crypto-js': '../lib/crypto-js/index',
            'socket-io': '../lib/socket.io-client/socket.io'
        },
        lnames = factory.utils.keys(libs);

    return {
        options: {
            optimize: 'none',
            paths: libs,
            shim: {
                'angular': {
                    exports: 'angular',
                    deps: ['jquery']
                },
                'angular-peity': {
                    deps: ['peity']
                },
                'angular-breadcrumb': {
                    deps: ['angular-ui-router']
                },
                'angular-bootstrap': {
                    deps: ['bootstrap-markdown']
                },
                'angular-datatables': {
                    deps: ['datatables']
                },
                'angular-socket-io': {
                    deps: ['socket-io']
                },
                'peity': {
                    deps: ['jquery']
                }
            },
            packages: [{
                name: 'crypto-js',
                location: '../lib/crypto-js',
                main: 'index'
            }]
        },
        'build': {
            options: {
                baseUrl: 'app/src',
                include: ['../lib/almond/almond', 'main'],
                out: 'app/dist/main.js',
                wrap: {
                    start: '(function() {',
                    end: '}());'
                },
                //optimize: 'uglify',
            }
        },
        'bundle': {
            options: {
                appDir: 'app/',
                baseUrl: './src',
                optimizeCss: 'none',
                dir: 'app/build',
                skipDirOptimize: true,
                modules: [{
                    name: '../../dist/bundle.main',
                    create: true,
                    include: [
                        'main'
                    ],
                    exclude: lnames
                }, {
                    name: '../../dist/bundle.libs',
                    create: true,
                    include: lnames
                }]
            }
        }
    };
};
