const path = require('path');

module.exports = function(grunt, factory) {
    var dist = Object.keys(factory.app.config.build.js)[0],
        source = factory.app.config.build.js[dist];
    return {
        options: {
            baseUrl: path.dirname(source),
            paths: '<%= app.config.paths %>',
            shim: '<%= app.config.shim %>',
            wrap: {
                start: "(function() {",
                end: "}());"
            },
            include: ['../lib/almond/almond', path.basename(source)],
            out: dist
        },
        "build": {
            options: {
                optimize: "uglify2",
            }
        },
        "live": {
            options: {
                optimize: 'none'
            }
        }
    };
};
