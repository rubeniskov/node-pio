module.exports = function(grunt, data) {
    return {
        "core-js": (function(){
            grunt.event.on('watch', function(action, filepath, task) {
                (task === 'core-js') && grunt.config('jshint.core-js.src', filepath);
            });
            return {
                options: {
                    spawn: false,
                    interrupt: false,
                    debounceDelay: 250
                    // livereload: {
                    //     port: 35729
                    // }
                },
                files: 'app/script/{,*/}*.js',
                tasks: ['jshint:core-js', 'requirejs:live']
            };
        })(),
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
