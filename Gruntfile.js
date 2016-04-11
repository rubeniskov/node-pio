const   fs = require('fs');

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: require('path').join(process.cwd(), 'grunt/tasks'),
        data: {
            app: {
                name : grunt.package.name,
                version : grunt.package.version,
                config: JSON.parse(fs.readFileSync('./config.json', 'utf8')).app
            }
        }
    });

    grunt.task.run('notify_hooks');
};
