var fs = require('fs'),
    path = require('path');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

function ScreenshotReporter(config) {
    this.config = config ||  {};
    this.config.baseDirectory = path.resolve(__dirname, '../../', this.config.baseDirectory) || '/tmp/screenshots'
};

ScreenshotReporter.prototype.jasmineStarted = function(suiteInfo) {
    if (!fs.existsSync(this.config.baseDirectory)) {
        fs.mkdirSync(this.config.baseDirectory);
    }
};

ScreenshotReporter.prototype.specDone = function(result) {
    var self = this;
    name = result.fullName.replace(/\W+/g, "-").replace(/^\W+/, '').toLowerCase();
    browser.takeScreenshot().then(function(png) {
        writeScreenShot(png, self.config.baseDirectory + '/' + name + '.png');
    });
};

module.exports = ScreenshotReporter;
