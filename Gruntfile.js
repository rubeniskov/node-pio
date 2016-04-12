module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: require('path').join(process.cwd(), 'grunt/tasks'),
        data: {
            app: {
                name : '<%= package.name %>',
                version : '<%= package.version %>',
                config: grunt.file.readJSON('./config.json', 'utf8').app,
                package : '<%= package %>',
            }
        }
    });

    grunt.task.run('notify_hooks');
};
