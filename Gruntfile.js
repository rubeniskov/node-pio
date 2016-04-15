const utils = require('./grunt/lib/utils');

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: require('path').join(process.cwd(), 'grunt/tasks'),
        data: {
            utils: utils,
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
