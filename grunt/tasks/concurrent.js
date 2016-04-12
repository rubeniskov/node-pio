module.exports = function(grunt) {
    return {
        options: {
            logConcurrentOutput: true
        },
        'build': ["build:app:css", "build:app:js"]
    };
};
