module.exports = function(schema) {
    return schema({
        title: {
            type: String
        },
        notes: {
            type: String
        },
        polling: [{
            title: {
                type: String
            },
            notes: {
                type: String
            },
            votes: [{
                user: {
                    type: String,
                    ref: 'User'
                },
                value: {
                    type: Number
                }
            }]
        }]
    }, {
        //autoIndex: false,
        permissions: 'o+crud,g+r',
        ownership: 'admin:users'
    });
}
