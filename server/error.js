const   express     = require('express'),
        path        = require('path')
        router      = express.Router();


module.exports = function(app, cfg, opts){
    return router
        .use(function(req, res, next){
            res.status(404);
            if (req.accepts('html')) {
              res.render('404.twig', { url: req.url });
              return;
            }
            if (req.accepts('json')) {
              res.send({ error: 'Not found' });
              return;
            }
            res.type('txt').send('Not found');
        });
};
