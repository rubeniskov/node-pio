const   express = require('express'),
        path = require('path'),
        router = express.Router();

module.exports = function(app, cfg, opts, utils){
    return router.get('/', function(req, res, next) {
        utils.sendFile('views/index.html', req, res, next);
    });
};
