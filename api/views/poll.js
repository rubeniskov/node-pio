const _ = require('underscore');

module.exports = function(router, orm, auth) {

    router.post('/poll/query', function(req, res) {
        orm.models.poll.datatable(req.body)
            .then(function(results) {
                res.status(200).json(results);
            }, function(err) {
                res.status(403).json(err);
            });
    });

    router.put('/poll', function(req, res) {
        orm.models.poll.create({
            title: req.body.title,
            notes: req.body.notes,
            polling: req.body.polling,
            creator: req.user.username
        }).then(function(doc) {
            res.status(200).json({
                data: {
                    id: doc._id
                },
                message: 'Poll created successfully'
            });
        }, function(err) {
            res.status(403).json(err);
        });
    });

    // router.get('/poll/:id', function(req, res) {
    //     orm.models.user.findOne(_.extend({
    //         _id : req.params.id
    //     }, req.body))
    //     .then(function(doc){
    //         res.status(200).json(doc);
    //     }, function(err){
    //         res.status(403).json(err.message);
    //     });
    // });
}
