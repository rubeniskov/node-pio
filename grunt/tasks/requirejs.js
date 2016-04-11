const   path = require('path');

module.exports = function(grunt, data) {
    var dist    = Object.keys(data.app.config["app-js"])[0],
        source  = data.app.config["app-js"][dist];
    return {
        "compile": {
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
            }
        }
    };
};
