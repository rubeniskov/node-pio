module.exports = function(grunt, data) {
    return {
        out_dir: require('os').tmpdir()+'/selenium',
        seleniumArgs: [],
        seleniumPort: 4444,
        ignore_ssl: false,
        proxy: false,
        method: 'GET',
        webdriverVersions: {
            selenium: '2.44.0',
            chromedriver: '2.12',
            firefoxdriver: '2.53'
        }
    };
};
