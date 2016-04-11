const   express     = require('express'),
        router      = express.Router(),
        jwt         = require('jsonwebtoken'),
        morgan      = require('morgan'),
        bodyParser  = require('body-parser'),
        secretToken = 'superSecret';

module.exports = function(options, orm){

    options.debug && router.use(morgan('api'));

    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());

    router.post('/authenticate', function(req, res) {
        var token = jwt.sign({
            username: 'test',
            role: 'ADMIN'
        }, secretToken, {
            expiresIn: 1440*60 // expires in 24 hours
        });

        res.json({
            message: 'Enjoy your token!',
            token: token
        });
    });

    router.use(function(req, res, next) {
        (function(token){
            token ? jwt.verify(token, secretToken, function(err, decoded){
                err ? res.status(403).json({
                    message: 'Failed to authenticate token.'
                }) : next();
            }) : res.status(400).json({
                message: 'No token provided.'
            });
        })(req.body.token || req.query.token || req.headers['x-access-token']);
    });

    require('./views/user.js')(router, orm);

    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    return router;
};
