module.exports = function(grunt, data) {
    return {
        dist: {
            options: {
                style: 'expanded'
            },
            files: '<%= app.config.app-css %>'
        }
    }
};
