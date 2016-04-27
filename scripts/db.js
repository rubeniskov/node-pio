module.exports = function(orm){

    orm.models.user.create({
        _id: '10000000A',
        username: 'admin',
        name: {
            first: 'Admin'
        },
        password: '0000',
        email: 'admin@test.com',
        groups: ['user', 'admin']
    }).then(function(doc){
        console.log('Admin saved!', doc);
    });

    orm.models.user.create({
        _id: '10000000U',
        username: 'user_test_0',
        name: {
            first: 'User'
        },
        password: '0000',
        email: 'user1@test.com',
        groups: ['user', 'deputy']
    }).then(function(doc){
        console.log('User saved!', doc);
    });

    orm.models.user.create({
        _id: '10000001U',
        username: 'user_test_1',
        name: {
            first: 'User'
        },
        password: '0000',
        email: 'user2@test.com',
        groups: ['user', 'deputy']
    }).then(function(doc){
        console.log('User saved!', doc);
    });

    orm.models.user.create({
        _id: '10000000V',
        username: 'user_view',
        name: {
            first: 'Viewer'
        },
        password: '0000',
        email: 'view@test.com',
        groups: ['user', 'deputy']
    }).then(function(doc){
        console.log('Viewer saved!', doc);
    });
}
