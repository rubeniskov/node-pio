const
    app         = require('express')(),
    path        = require('path'),
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

app.locals.version = pkg.version;
app.locals.name = pkg.name;
app.cfg = require('./cf/cf.js')(app, opts);
app.io  = require('./io/io.js')(app, http, {}, opts, cert);
app.ev  = require('./ev/ev.js')(app);
app.em  = require('./em/em.js')(app);
app.log = require('./log/log.js')(app);
app.orm = require('./orm/orm.js')({
    hostname: 'localhost',
    port: 27017,
    db: 'polls'
});

app
    .use('/api', require('./api/api.js')(app, app.cfg.get('$.api')[0], opts, cert))
    .use('/',    require('./server/server.js')(app, app.cfg.get('$.app')[0], opts, cert));

http.listen(opts.port, function() {
        opts.debug && app.use(app.log('app'));
        console.log('App listening on port ' + opts.port);
    });
