const   express     = require('express'),
        fs          = require('fs'),
        path        = require('path'),
        router      = express.Router();


module.exports = function(app, opts, cfg){
    var utils = {
            path: function(){
                return path.join.apply(null, [
                    opts.dirname,
                    cfg.dirname||__dirname
                ].concat(Array.prototype.slice.call(arguments)));
            },
            sendFile: function(path, req, res, next){
                fs.exists((path=utils.path(path)), function(exists){
                    return exists ? res.sendFile(path) : next();
                });
            }
        };

        app
            .set('views', utils.path('views'))
            .set('view engine', 'twig')
            .set('twig options', {
                strict_variables: false
            });

    return router
            .use(require('./index.js')(app, opts, cfg, utils))
            .use(require('./dist.js')(app, opts, cfg, utils))
            .use(require('./view.js')(app, opts, cfg, utils))
            .use(require('./font.js')(app, opts, cfg, utils))
            .use(require('./partial.js')(app, opts, cfg, utils))
            .use(require('./media.js')(app, opts, cfg, utils))
            .use(require('./error.js')(app, opts, cfg, utils));
}
