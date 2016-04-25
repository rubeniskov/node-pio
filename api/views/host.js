const _ = require('underscore');

module.exports = function(router, orm, auth) {

    router.post('/host/query', function(req, res) {

        return res.status(200).json({
            "draw": 1,
            "recordsTotal": 57,
            "recordsFiltered": 57,
            "data": [{
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "summary": [.1,.4,.5]
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "summary": [.3,.6,.1]
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "summary": [.3,.6,.1]
            }, {
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "summary": [.1,.4,.5]
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "summary": [.3,.6,.1]
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "summary": [.3,.6,.1]
            }, {
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "summary": [.1,.4,.5]
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "summary": [.3,.6,.1]
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "summary": [.3,.6,.1]
            }, {
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "summary": [.1,.4,.5]
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "summary": [.3,.6,.1]
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "summary": [.3,.6,.1]
            }]
        });
    });

    // router.put('/poll', function(req, res) {
    //     orm.models.user.create(req.body)
    //         .then(function(){
    //             res.status(200).json({
    //                 message: 'User created successfully'
    //             });
    //         }, function(err){
    //             res.status(400).json(err);
    //         });
    // });

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
