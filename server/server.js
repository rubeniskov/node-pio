const   express     = require('express'),
        fs          = require('fs'),
        path        = require('path'),
        router      = express.Router();


module.exports = function(app, cfg, opts, cert){
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
            .use(require('./index.js')(app, cfg, opts, utils))
            .use(require('./dist.js')(app, cfg, opts, utils))
            .use(require('./view.js')(app, cfg, opts, utils))
            .use(require('./font.js')(app, cfg, opts, utils))
            .use(require('./partial.js')(app, cfg, opts, utils))
            .use(require('./media.js')(app, cfg, opts, utils))
            .use(require('./error.js')(app, cfg, opts, utils));
}
