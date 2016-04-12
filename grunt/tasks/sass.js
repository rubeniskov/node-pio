module.exports = function(grunt, data) {
    return {
        "build": {
            options: {
                style: 'expanded'
            },
            files: '<%= app.config.build.css %>'
        }
    }
};
