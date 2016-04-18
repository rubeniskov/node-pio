module.exports = function(grunt) {
    return {
        options: {
            reporter: require('jshint-stylish'),
            force: true
        },
        'build': {
            options: {
                jshintrc: true
            },
            src: 'app/src/{,*/}*.js'
        }
    };
};
