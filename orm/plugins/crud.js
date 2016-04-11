module.exports = function(){
    return function(){
        
    }
}
// const   _           = require('underscore'),
//         q           = require('q'),
//         crudMap     = {
//             create: 'put',
//             read: 'get',
//             update:'post',
//             delete: 'delete'
//         }
//         crudBind    = function(modes, mode, fn){
//             return (_.isNull(modes) || _.isUndefined(modes) ? fn :
//                         ((_.isArray(modes) ||
//                           _.isString(modes) && (modes=[modes])) &&
//                           _.contains(modes, mode) ? fn :
//                             (_.isObject(modes) && modes[mode] ? modes[mode] :
//                                 function(){
//                                     return q.promise(function(resolve, reject){
//                                         reject({
//                                             message: 'Not allowed'
//                                         });
//                                     })
//                                 }
//                             )
//                         )
//                     );
//         };
//
// module.exports = function(model){
//     return {
//         create: crudBind(model.schema.crud, 'create', function(){
//             return q.promise(function(){
//                 console.log('Created');
//             });
//         }),
//         read: crudBind(model.schema.crud, 'read', function(data){
//             return q.promise(function(){
//                 model.findOne(data);
//                 console.log('Created');
//             })
//         }),
//         update: crudBind(model.schema.crud, 'update', function(){
//             return q.promise(function(){
//                 model.findOne(data);
//                 console.log('Created');
//             })
//         }),
//         delete: crudBind(model.schema.crud, 'delete', function(){
//             return q.promise(function(){
//                 model.findOne(data);
//                 console.log('Created');
//             })
//         }),
//         crud: function(route, handlers){
//
//             _.each(crudMap, function(k,v){
//                 //console.log(k,v, route[k]);
//                 route[k]()
//             });
//
//             return this;
//
//             // model.schema.crud.map(function(){
//             //
//             // });
//             // console.log(this, model.schema.crud);
//         }
//     }
// };
//
//
// // module.exports = function Crud(schema, options){
// //     // schema.pre('save', function (next) {
// //     //     this.lastMod = new Date
// //     //     next()
// //     // })
// // }
