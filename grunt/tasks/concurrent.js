module.exports = function(grunt) {
    return {
        options: {
            logConcurrentOutput: true
        },
        'build': {
            tasks: ['build:app:css', 'build:app:js', 'copy:fonts']
        },
        'live': {
            tasks: ['watch:live-js-build', 'watch:live-css']
        }
    };
};
