const
    app         = require('express')(),
    path        = require('path'),
    morgan      = require('morgan'),
    colors      = require('colors'),
    mongoose    = require('mongoose'),
    fs          = require('fs'),
    cert        = {
        key: fs.readFileSync('ssl/server.key', 'utf8'),
        pub: fs.readFileSync('ssl/server-pub.key', 'utf8'),
        cert: fs.readFileSync('ssl/server.crt', 'utf8')
    },
    pkg         = JSON.parse(fs.readFileSync('package.json', 'utf8')),
    http        = require('http').createServer(app),
    opts        = require('nomnom')
        .usage('Start webserver.\nUsage: $0')
        .option('port', {
            abbr: 'p',
            flag: true,
            default: 8080,
            help: 'Listen port webserver'
        })
        .option('debug', {
            abbr: 'd',
            flag: true,
            default: true,
            help: 'Print debugging info'
        })
        .option('config', {
            abbr: 'c',
            default: 'config.json',
            help: 'JSON file with tests to run'
        })
        .option('dirname', {
            default: __dirname,
            help: 'Root App directory'
        })
        .option('version', {
            flag: true,
            help: 'print version and exit',
            callback: function() {
                return "version 1.2.4";
            }
        })
        .parse()

var cfg     = JSON.parse(fs.readFileSync(opts.config, 'utf8'));

//mongoose.connect('mongodb://localhost:27017/polls');

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

// Configuración
// app.configure(function() {
//     // Localización de los ficheros estÃ¡ticos
//     app.use(express.static(__dirname + '/public'));
//     // Muestra un log de todos los request en la consola
//     app.use(express.logger('dev'));
//     // Permite cambiar el HTML con el método POST
//     app.use(express.bodyParser());
//     // Simula DELETE y PUT
//     app.use(express.methodOverride());
// });

// configure app to use bodyParser()
// this will let us get the data from a POST

app.locals.version = pkg.version;
app.locals.name = pkg.name;

app.orm = require('./orm/orm.js')({
    hostname: 'localhost',
    port: 27017,
    db: 'polls'
});

// app.use(require('node-sass').middleware({
//          src: __dirname + '/app/scss', //where the sass files are
//          dest: __dirname + '/public', //where css should go
//          debug: true // obvious
// }));

app
    .use('/api', require('./api/api.js')(app, cfg.api, opts, cert))
    .use('/',    require('./server/server.js')(app, cfg.app, opts, cert));


app.io = require('./io/io.js')(http, {}, opts, cert);

;

require('./scripts/db.js')(app.orm.auth('root', ['root']));

http.listen(opts.port, function() {
        opts.debug && app.use(morgan('app'));
        console.log('App listening on port ' + opts.port);
    });
