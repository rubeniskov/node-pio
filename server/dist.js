const   express = require('express'),
        path = require('path'),
        router = express.Router();

module.exports = function(app, opts, cfg, utils){
    return router.get('/dist/:filename', function(req, res, next) {
        utils.sendFile('dist/'+req.params.filename, req, res, next);
    });
};
