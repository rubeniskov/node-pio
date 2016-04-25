const   express = require('express'),
        path = require('path'),
        router = express.Router();

module.exports = function(app, cfg, opts, utils){
    return router.get('/dist/:filename', function(req, res, next) {
        utils.sendFile('dist/'+req.params.filename, req, res, next);
    });
};
