var express     = require('express'),
    path        = require('path'),
    util        = require('util'),
    morgan      = require('morgan'),
    colors      = require('colors'),
    mongoose    = require('mongoose'),
    app         = express(),
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
        .option('version', {
            flag: true,
            help: 'print version and exit',
            callback: function() {
                return "version 1.2.4";
            }
        })
        .parse()

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

app.orm = require('./orm/orm.js')({
    hostname: 'localhost',
    port: 27017,
    db: 'polls'
});

app.io = require('socket.io')(app.server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/views/:view', function(req, res) {
    res.sendFile(__dirname + '/views/' + req.params.view);
});

app.get('/css', function(req, res) {
    res.send('hello');
});

app.get('/js', function(req, res) {
    res.send('hello');
});

app.use('/api', require('./api/api.js')(opts, app.orm));

app.listen(opts.port, function() {
    opts.debug && app.use(morgan('app'));
    console.log('App listening on port ' + opts.port);
});

app.on('connection', function() {
    console.log('Socket.io Connected');
});

//console.log(orm.models.role.read);

//console.log(app.orm.models.user.create.toString());
app.orm.auth('admin', ['admin']);
app.orm.models.user.create({
    _id: (10000000+Math.floor(Math.random()*1000000))+'M',
    name: {
        first: 'jurjut'
    },
    password: 123
}, function(err){
    console.log(err);
}).then(function(){
    console.log('Success', arguments);
}, function(err){
    console.log('Error', err, JSON.stringify(err, null , 4));
});

// app.orm.models.user.findOne({
//     _id: '10477185M'
// }, function(err){
//     console.log(err);
// }).then(function(){
//     console.log('Success', arguments);
// }, function(err){
//     console.log('Error', err, JSON.stringify(err, null , 4));
// });
