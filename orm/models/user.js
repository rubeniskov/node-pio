const
    crypto = require('crypto-js'),
    fs = require('fs'),
    pub = fs.readFileSync('./ssl/server-pub.key', 'utf8').replace(/\-{5}([\sa-zA-Z]+)\-{5}|\n/gi, '');

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
            permissions: 'o+cru'
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
        email: {
            type: String,
            index: true,
            unique: true,
            dropDups: true,
            required: [true, 'user.email is required'],
            match: [/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, 'user.id invalid format']
        },
        phone: {
            type: String,
            match: [/^\+(?:[0-9]\s?){6,14}[0-9]$/i, 'user.phone invalid format']
        },
        birthdate : {
            type: Date
        },
        status : {
            type: Number
        },
        groups: [ String ],
        pristine: {
            type: Boolean,
            default: true
        }
    }, {
        autoIndex: false,
        permissions: 'o+crud,g+r',
        ownership: 'admin:users',
        virtuals: {
            'name.full': function () {
              return this.name.first + ' ' + this.name.last;
            }
        }
    }).pre('save', function(next){
        if(this._doc && this._doc.password)
            this._doc.password = crypto.SHA256(this._doc.password).toString();
        next();
    }).pre('findOne', function(next){
        if(this._conditions && this._conditions.password)
            this._conditions.password = crypto.SHA256(this._conditions.password).toString();
        next();
    });
}
