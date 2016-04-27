const
    morgan      = require('morgan'),
    colors      = require('colors');

module.exports = function(app){
    morgan.format('app', [
            'HTTP/:http-version'.magenta,
            '<--'.green,
            ':status'.yellow,
            '\':method :url\''.green,
            ':res[content-length]'.yellow,
            'bytes',
            ':response-time'.yellow,
            'ms'
        ].join(' '));

    morgan.token('bodypased', function(req, res){
        return JSON.stringify(req.body, null, 2);
    })

    morgan.format('api', [
            '[API]'.blue,
            'HTTP/:http-version'.magenta,
            '<--'.blue,
            ':status'.yellow,
            '\':method :url\''.green,
            ':res[content-length]'.yellow,
            'bytes',
            ':response-time'.yellow,
            'ms',
            ':bodypased'

        ].join(' '));

    return morgan;
}
