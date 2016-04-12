const   path = require('path');

module.exports = function(grunt, data) {
    var dist    = Object.keys(data.app.config.build.js)[0],
        source  = data.app.config.build.js[dist];
    return {
        "build": {
            options: {
                baseUrl: path.dirname(source),
                paths: '<%= app.config.paths %>',
                shim: '<%= app.config.shim %>',
                optimize: "uglify2",

                wrap: {
                    start: "(function() {",
                    end: "}());"
                },
                include: ['../lib/almond/almond', path.basename(source)],
                out: dist
            }
        }
    };
};
