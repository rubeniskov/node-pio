module.exports = function(grunt) {
    return {
        options: {
            logConcurrentOutput: true
        },
        'build': ['build:app:css', 'build:app:js'],
        'live': ['karma:live-unit', 'protractor:live-e2e', 'watch']
    };
};
