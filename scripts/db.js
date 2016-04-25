module.exports = function(orm){

    orm.models.user.create({
        _id: '10000000A',
        name: {
            first: 'Admin'
        },
        password: '0000',
        groups: ['user', 'admin']
    }).then(function(doc){
        console.log('Admin saved!', doc);
    });

    orm.models.user.create({
        _id: '10000000U',
        name: {
            first: 'User'
        },
        password: '0000',
        groups: ['user', 'deputy']
    }).then(function(doc){
        console.log('User saved!', doc);
    });

    orm.models.user.create({
        _id: '10000001U',
        name: {
            first: 'User'
        },
        password: '0000',
        groups: ['user', 'deputy']
    }).then(function(doc){
        console.log('User saved!', doc);
    });

    orm.models.user.create({
        _id: '10000000V',
        name: {
            first: 'Viewer'
        },
        password: '0000',
        groups: ['user', 'deputy']
    }).then(function(doc){
        console.log('Viewer saved!', doc);
    });
}
