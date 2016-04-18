const path = require('path');

module.exports = function(grunt, data) {
    return {
        "build": {
            options: {
                style: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
                importer: function(url, prev, done) {
                    if ((/\.css$/).test(url)) {
                        done({
                            contents: grunt.file.read(path.resolve(path.dirname(prev),url))
                        });
                    } else {
                        done({
                            file: url
                        });
                    }
                }
            },
            files: '<%= app.config.build.css %>'
        }
    }
};
