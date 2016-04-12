module.exports = function(grunt, data) {
    return {
        options: {
            enabled: true,
            max_jshint_notifications: 5,
            title: 'app:<%= app.name %>',
            success: true,
            duration: 10
        }
    };
};
