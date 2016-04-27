const _ = require('underscore'),
    lpad = require("underscore.string/lpad");;

module.exports = function(router, app, auth) {

    router.post('/user/query', function(req, res) {
        app.orm.models.user.datatable(req.body)
            .then(function(results) {
                res.status(200).json(results);
            }, function(err) {
                res.status(403).json(err);
            });
    });

    router.put('/user', function(req, res) {
        var passwd = lpad(Math.floor((Math.random()*4)), 4, '0');
        app.orm.models.user.create(_.extend({
            password: passwd
        }, req.body))
            .then(function(doc) {
                app.ev.emit('user:created', doc, passwd);
                res.status(200).json({
                    message: 'User created successfully'
                });
            }, function(err) {
                res.status(400).json(err);
            });
    });

    router.get('/user/:id', function(req, res) {
        app.orm.models.user.findOne(_.extend({
                _id: req.params.id
            }, req.body))
            .then(function(doc) {
                res.status(200).json(doc);
            }, function(err) {
                res.status(403).json(err.message);
            });
    });

    router.post('/user/:user', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    router.delete('/user/:user', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });
}
