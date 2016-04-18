const   express = require('express'),
        path = require('path'),
        router = express.Router();

module.exports = function(app, opts, cfg, utils){
    return router.get('/font/*', function(req, res, next) {
        utils.sendFile('fonts/'+req.params[0], req, res, next);
    });
};
