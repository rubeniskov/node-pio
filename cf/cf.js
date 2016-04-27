const
    _ = require('underscore'),
    jpath = require('jsonpath'),
    jsonfile = require('jsonfile'),
    fs = require('fs');

module.exports = function(app, opts, json){
    return (json={
        save: function(obj){
            return jsonfile.writeFile(opts.config, _.extend(obj, json.read()), {spaces: 4}, function(err) {
                console.error(err);
            });
        },
        read: function(){
            return jsonfile.readFileSync(opts.config);
        },
        get: function(query){
            return jpath.query(json.read(), query);
        }
    })
}
