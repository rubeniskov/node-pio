const   driver      = require('mongoose'),
        defaults    = {
            hostname: 'localhost',
            port: '27017',
            db: '',
            user: '',
            pass: ''
        } ;

module.exports = function(utils){
    return function(options){
        return (function(options){
            return driver.connect(['mongodb://',[options.hostname,options.port].join(':'),'/', options.db].join(''), {
                user: options.user,
                password: options.password
            }) ;
        })(utils.deepExtend(defaults, options));
    };
};
// function(options){
//     return (function(options){
//         return driver.connect(['mongodb://',[options.hostname,options.port].join(':'),'/', options.db].join(''), {
//             user: options.user,
//             password: options.password
//         }) ;
//     })(deepExtend(defaults, options));
// }
