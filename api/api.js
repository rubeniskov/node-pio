const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto-js'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, cfg, opts, cert) {

    var pub = cert.pub.replace(/\-{5}([\sa-zA-Z]+)\-{5}|\n/gi, '');

    opts.debug && router.use(morgan('api'));

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.use(bodyParser.json());

    router.get('/', function(req, res) {
        res.json({
            auth: {
                type: 'jwt',
                header: 'x-access-token',
                prefix: ''
            },
            key: cert.pub.replace(/\-{5}([\sa-zA-Z]+)\-{5}|\n/gi, ''),
            version: app.locals.version,
            name: app.locals.name
        });
    });

    router.post('/authenticate', function(req, res) {

        var credentials = JSON.parse(crypto.AES.decrypt(req.body.hash, pub).toString(crypto.enc.Utf8));
        app.orm.models.user.findOne({
            _id: credentials.id,
            password: credentials.password
        })
            .then(function(user) {
                if (user) {
                    var token = jwt.sign({
                        username: user.username,
                        groups: user.groups
                    }, cert.key, {
                        algorithm: 'RS256',
                        expiresIn: 1440 * 60 // expires in 24 hours
                    });

                    res.json({
                        message: 'Authentification Success!',
                        token: token
                    });
                } else {
                    res.status(403).json({
                        message: 'Authentification failed!'
                    });
                }
            }, function(err) {
                res.status(403).json({
                    message: err.message
                });
            });
    });

    router.use(function(req, res, next) {
        (function(token) {
            token ? jwt.verify(token, cert.pub, {
                algorithms: ['RS256']
            }, function(err, decoded) {
                req.user = decoded;
                err ? res.status(403).json({
                    message: 'Failed to authenticate token.'
                }) : next();
            }) : res.status(401).json({
                message: 'No token provided.'
            });
        })(req.body.token || req.query.token || req.headers['x-access-token']);
    });

    require('./views/user.js')(router, app.orm);
    require('./views/poll.js')(router, app.orm);
    require('./views/host.js')(router, app.orm);

    router.use(function(req, res, next) {
        res.status(404);

        if (req.accepts('json')) {
            res.send({
                error: 'Not found'
            });
            return;
        }
        res.type('txt').send('Not found');
    });

    return router;
};
