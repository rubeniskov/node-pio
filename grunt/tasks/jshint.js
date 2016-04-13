module.exports = function(grunt) {
    return {
        options: {
            reporter: require('jshint-stylish'),
            force: true
        },
        'core-js': {
            options: {
                jshintrc: true
            },
            src: 'app/script/{,*/}*.js'
        }
    };
};
