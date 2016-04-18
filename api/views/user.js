const _ = require('underscore');

module.exports = function(router, orm, auth) {
    // GET, POST, PUT, and DELETE CRUD
    // GET, UPDATE, CREATE, DELETE
    // 0000 1111 1+2+4+8 16
    // orm.models.user
    //     .expose(router, auth);

    router.post('/user/query', function(req, res) {
        // orm.models.user.find(req.body)
        //     .then(function(docs) {
        //         res.status(200).json(docs);
        //     });

        return res.status(200).json({
            "draw": 1,
            "recordsTotal": 57,
            "recordsFiltered": 57,
            "data": [{
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "lastName": "Yoda"
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "lastName": "Whateveryournameis"
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "lastName": "Whateveryournameis"
            }, {
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "lastName": "Yoda"
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "lastName": "Whateveryournameis"
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "lastName": "Whateveryournameis"
            }, {
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "lastName": "Yoda"
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "lastName": "Whateveryournameis"
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "lastName": "Whateveryournameis"
            }, {
                "id": 860,
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
                "lastName": "Yoda"
            }, {
                "id": 870,
                "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                "lastName": "Whateveryournameis"
            }, {
                "id": 870,
                "title": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
                "lastName": "Whateveryournameis"
            }]
        });
    });

    router.put('/user', function(req, res) {
        orm.models.user.create(req.body)
            .then(function() {
                res.status(200).json({
                    message: 'User created successfully'
                });
            }, function(err) {
                res.status(400).json(err);
            });
    });

    router.get('/user/:id', function(req, res) {
        orm.models.user.findOne(_.extend({
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
