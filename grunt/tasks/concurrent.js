module.exports = function(grunt) {
    return {
        options: {
        //    logConcurrentOutput: true
        },
        'build': ['build:app:css', 'build:app:js', 'copy:fonts'],
        'live': ['karma:live-unit', 'protractor:live-e2e', 'watch']
    };
};
