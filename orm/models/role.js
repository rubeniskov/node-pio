module.exports = function(schema){
    return schema({
        name: {
            type: String,
            unique: true,
            required: true,
            min: 2,
            max: 16
        },
        description: {
            type: String,
            min: 16,
            max: 128
        },
        permissions: {
            type: Object // permission: mask
        }
    }, {
        crud: 'read'
    });
};
