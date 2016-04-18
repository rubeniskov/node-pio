module.exports = function(grunt, factory) {
    return {
        'fonts': {
            files: factory.utils.map(factory.app.config.fonts, function(path, name){
                return [{
                    expand: true,
                    cwd: path,
                    src: ['**'],
                    dest: factory.utils.path.join(factory.app.config.dirname, 'fonts', name)
                }]
            })
        }
    };
};
