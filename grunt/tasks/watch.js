module.exports = function(grunt, data) {
    grunt.event.on('watch', function(action, filepath, task) {
        (/\-js\-/).test(task) && grunt.config('jshint.core-js.src', filepath);
    });
    return {
        "live-js-bundle": {
            options: {
                spawn: true,
                interrupt: false,
                debounceDelay: 250
            },
            files: 'app/src/{,*/}*.js',
            tasks: ['requirejs:bundle']
        },
        "live-js-build": {
            options: {
                spawn: true,
                interrupt: false,
                debounceDelay: 250
            },
            files: 'app/src/{,*/}*.js',
            tasks: ['jshint:build', 'requirejs:build']
        },
        "live-css": {
            files: 'app/scss/{,*/}*.scss',
            tasks: ['sass'],
            options: {
                nospawn: true
            }
        }
    }
};
