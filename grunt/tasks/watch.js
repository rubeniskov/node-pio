module.exports = function(grunt, data) {
    return {
        "core-js": {
            // options: {
            //     //livereload: '<%= connect.options.livereload %>'
            // },
            files: 'app/script/{,*/}*.js',
            tasks: ['requirejs']
        },
        "core-css": {
            files: 'app/scss/{,*/}*.scss',
            tasks: ['sass'],
            options: {
                nospawn: true,
                //livereload: '<%= connect.options.livereload %>'
            }
        }
    }
};
