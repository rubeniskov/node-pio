const   _           = require('underscore'),
        access      = {
            'read' : 1 << 1,
            'write' : 1 << 2,
            'delete' : 1 << 3,
            'update' : 1 << 4
        },
        special     = {
            'setuid': 1 << 1,
            'setgid': 1 << 2
        },
        parse       = function(permissions){
            permissions = _.isArray(permissions) ? permissions.join('') :
                         (_.isNumber(permissions) || _.isString(permissions) ? permissions : 640) + '';
            permissions = permissions.length >= 4 ?
                            permissions :
                            new Array(4 - permissions.length + 1).join(0) + permissions;
            permissions = permissions.split('').map(function(v){
                return parseInt(v)
            });
            return permissions;
        },
        ownership   = function ownership(owners, cgroups, umask){
            umask       = parse(umask);
            cgroups     = _.isString(cgroups) ? [cgroups] : cgroups || ['root'];
            owners      = _.isString(owners) ? [owners] : owners || ['root'];
            return function authorized(user, groups){
                var accessMap = [
                        _.indexOf(owners, user) !== -1,                 // USER
                        _.intersection(cgroups, groups).length !== 0  // GROUP
                    ],
                    mask = _.reduce(accessMap, function(memo, valid, index){
                        return memo|=valid ? umask[index+1] : 0;
                    }, umask[3]);
                return {
                    check: function(action){
                        return !!(mask&(access[action]||0));
                    },
                    ownership: function(sowners, scgroups, sumask){
                        return ownership(sowners||owners, scgroups||cgroups, sumask||umask)(user, groups);
                    }
                };
            };
        },
        checkFields      = function(fields, auth, action){
            var checked  = [[],[]]
            _.each(fields, function(field, path){
                var options = (field.options||{}),
                    fauth = auth.ownership(options.owners, options.groups, options.permissions);
                    checked[fauth.check(action)&1].push(path);
            });
            return checked;
        },
        args = function(args, slice, sliceEnd) {
            var ret = [];
            var len = args.length;

            if (0 === len) return ret;

            var start = slice < 0 ? Math.max(0, slice + len) : slice || 0;

            if (sliceEnd !== undefined) {
                len = sliceEnd < 0 ? sliceEnd + len : sliceEnd
            }

            while (len-- > start) {
                ret[len - start] = args[len];
            }

            return ret;
        }

// READ || WRITE || DELETE

// CREATE -> WRITE
// READ -> READ
// UPDATE -> (READ + WRITE)
// DELETE -> (READ + DELETE)

// CREATE // READ // UPDATE // DELETE

// SPECIAL // USER // GROUP // OTHER
var _user, _grops;
module.exports = {
    auth: function(user, groups){
        _user = user;
        _groups = groups;
    },
    plugin: function(schema, options){
        var opts        = options||{},
            authorizer  = ownership(schema.options.owners, schema.options.groups, schema.options.permissions),
            actions     = {
                create: ['save', function(query, next) {
                    //console.log('Save', this, arguments);

                    // var auth    = authorizer(query.options.user, query.options.groups),
                    //     fields, forbidden;
                    //
                    // if (auth.check('write')){
                    //
                    //     // fields = checkFields(query.schema.paths, auth, 'write');
                    //     // forbidden = _.intersection(_.keys(query._conditions), fields[0])[0];
                    //     //
                    //     // if(forbidden){
                    //     //     return next({
                    //     //         message: 'permission denied',
                    //     //         reason: 'you do not have access to the following fields: [' + forbidden + ']'
                    //     //     });
                    //     // }
                    //     //
                    //     // query._fields = fields[1];
                    //     return next();
                    // }

                    return next({
                        message: 'permission denied',
                        reason: 'you do not have access to the following model: [' + query.model.modelName + ']'
                    });
                    //
                    // var vm = schema;
                    // if (vm.options && vm.options.authLevel) {
                    //     if (vm.schema.permissions[vm.options.authLevel] && vm.schema.permissions[vm.options.authLevel].save) {
                    //         //check to see if the group has permission to save a new document
                    //         return next();
                    //     } else {
                    //         return next({
                    //             message: 'permission denied',
                    //             reason: 'you do not have access to the following permissions: [save]'
                    //         });
                    //     }
                    // } else {
                    //     return next();
                    // }
                }],
                read: ['find', 'findOne', function(query, next) {
                    var auth    = authorizer(query.options.user, query.options.groups),
                        fields, forbidden;

                    if (auth.check('read')){

                        fields = checkFields(query.schema.paths, auth, 'read');
                        forbidden = _.intersection(_.keys(query._conditions), fields[0])[0];

                        if(forbidden){
                            return next({
                                message: 'permission denied',
                                reason: 'you do not have access to the following fields: [' + forbidden + ']',
                                code: 403
                            });
                        }

                        query._fields = fields[1];
                        return next();
                    }

                    return next({
                        message: 'permission denied',
                        reason: 'you do not have access to the following model: [' + query.model.modelName + ']'
                    });
                }],
                update: ['update', 'findOneAndUpdate', function(schema, next) {
                    var vm = schema;
                    var authorizedFields = [];
                    var authorizedReturnFields = [];
                    if (vm.options && vm.options.authLevel) {
                        if (vm.options.upsert && !vm.schema.permissions[vm.options.authLevel].save) {
                            //check to see if 'upsert: true' option is set, then verify if group has save permission
                            return next({
                                message: 'permission denied',
                                reason: 'you do not have access to the following permissions: [save]'
                            });
                        }
                        if (vm.schema.permissions[vm.options.authLevel] && vm.schema.permissions[vm.options.authLevel].write) {
                            //check to see if group has any write permissions and add to the authorizedFields array
                            authorizedFields = authorizedFields.concat(vm.schema.permissions[vm.options.authLevel].write);
                        }
                        if (vm.schema.permissions.defaults && vm.schema.permissions.defaults.write) {
                            //check to see if there are any default write permissions and add to the authorizedFields array
                            authorizedFields = authorizedFields.concat(vm.schema.permissions.defaults.write);
                        }

                        //create an update object that has been sanitized based on permissions
                        var sanitizedUpdate = {};
                        authorizedFields.forEach(function(field) {
                            sanitizedUpdate[field] = vm._update[field];
                        });

                        //check to see if the group is trying to update a field it does not have permission to
                        var discrepancies = _.difference(Object.keys(vm._update), Object.keys(sanitizedUpdate));
                        if (discrepancies[0]) {
                            //if a group is searching by a field they do not have access to, return an error
                            return next({
                                message: 'permission denied',
                                reason: 'you do not have access to the following fields: [' + discrepancies.toString() + ']'
                            });
                        } else {

                            //Detect which fields can be returned if 'new: true' is set
                            if (vm.schema.permissions[vm.options.authLevel] && vm.schema.permissions[vm.options.authLevel].read) {

                                //check to see if the group has any read permissions and add to the authorizedFields array
                                authorizedReturnFields = authorizedReturnFields.concat(vm.schema.permissions[vm.options.authLevel].read);
                            }
                            if (vm.schema.permissions.defaults && vm.schema.permissions.defaults.read) {

                                //check to see if there are any default read permissions and add to the authorizedFields array
                                authorizedReturnFields = authorizedReturnFields.concat(vm.schema.permissions.defaults.read);
                            }

                            //create a sanitizedReturnFields object that will be used to return only the fields that a group has access to read
                            var sanitizedReturnFields = {};
                            authorizedReturnFields.forEach(function(field) {
                                sanitizedReturnFields[field] = 1;
                            });
                            vm._fields = sanitizedReturnFields;
                            return next();
                        }
                    } else {
                        return next();
                    }
                }],
                delete: ['findOneAndRemove', function(schema, next) {
                    var vm = schema;
                    if (vm.options && vm.options.authLevel) {
                        if (vm.schema.permissions[vm.options.authLevel] && vm.schema.permissions[vm.options.authLevel].remove) {
                            //check to see if the group has permission to remove a document
                            return next();
                        } else {
                            return next({
                                message: 'permission denied',
                                reason: 'you do not have access to the following permissions: [remove]'
                            });
                        }
                    } else {
                        return next();
                    }
                }]
            };

            // var utils = require('util');
            //
            // schema.statics.create = function create(doc, callback) {
            //       var args,
            //         cb;
            //
            //     if (Array.isArray(doc)) {
            //         args = doc;
            //         cb = callback;
            //     } else {
            //         var last = arguments[arguments.length - 1];
            //         if (typeof last === 'function') {
            //             cb = last;
            //             args = args(arguments, 0, arguments.length - 1);
            //         } else {
            //             args = args(arguments);
            //         }
            //     }
            //
            //     var Promise = PromiseProvider.get();
            //     var _this = this;
            //
            //     var promise = new Promise.ES6(function(resolve, reject) {
            //         if (args.length === 0) {
            //             process.nextTick(function() {
            //                 cb && cb(null);
            //                 resolve(null);
            //             });
            //             return;
            //         }
            //
            //         var toExecute = [];
            //         args.forEach(function(doc) {
            //             toExecute.push(function(callback) {
            //                 var toSave = new _this(doc);
            //                 var callbackWrapper = function(error, doc) {
            //                     if (error) {
            //                         return callback(error);
            //                     }
            //                     callback(null, doc);
            //                 };
            //
            //                 // Hack to avoid getting a promise because of
            //                 // $__registerHooksFromSchema
            //                 if (toSave.$__original_save) {
            //                     toSave.$__original_save({
            //                         __noPromise: true
            //                     }, callbackWrapper);
            //                 } else {
            //                     toSave.save({
            //                         __noPromise: true
            //                     }, callbackWrapper);
            //                 }
            //             });
            //         });
            //
            //         async.parallel(toExecute, function(error, savedDocs) {
            //             if (error) {
            //                 cb && cb(error);
            //                 reject(error);
            //                 return;
            //             }
            //
            //             if (doc instanceof Array) {
            //                 resolve(savedDocs);
            //                 cb && cb.call(_this, null, savedDocs);
            //             } else {
            //                 resolve.apply(promise, savedDocs);
            //                 if (cb) {
            //                     savedDocs.unshift(null);
            //                     cb.apply(_this, savedDocs);
            //                 }
            //             }
            //         });
            //     });
            //
            //     return promise;
            // }

            _.each(actions, function(methods){
                var fn = methods.pop();
                _.each(methods, function(method){
                    schema.pre(method, function(next){
                        //console.log(method, this, arguments)
                        fn(this, next);
                    });
                })
            })
    }
}
