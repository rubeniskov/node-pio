const   crypto = require('crypto'),
        secret = 'abcdefg',
        crypter = crypto.createHmac('sha256', secret);

module.exports = function(schema){
    return schema({
        _id: {
            type: String,
            index: true,
            required: [true, 'user.id is required'],
            match: [/^(([A-Z]\d{8})|\d{8}|(\d{8}[A-Z])|([A-Z]\d{8}[A-Z]))$/, 'user.id invalid format']
        },
        password: {
            type: String,
            required: [true, 'user.password is required'],
            permissions: '1000'//,
            // default: function(){
            //     console.log(this);
            // }
        },
        name: {
            first: {
                type: String,
                required: [true, 'user.name is required']
            },
            last: {
                type: String
            }
        },
        phone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v); // TODO
                },
                message: '{VALUE} is not a valid phone number!'
            }
        },
        birthdate : {
            type: Date
        },
        groups: {
            type: Array
        }
    }, {
        permissions: '110',
        groups: 'admin'
    });
}
