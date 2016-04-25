/*

accessMap
    |
    |-> C       Create action
    |-> R       Read action
    |-> U       Update action
    |-> D       Delete action

rolesMap
    |
    |-> O       Owner role
    |-> G       Group role
    |-> W       World

specialMap
    |
    |-> T
    |-> S
    |-> K

    +---------------------------------------------------------------------------+
    | Mask Details                                          |                   |
    +-----------+-----------+-----------+-------------------+-------------------+
    | Bits      | Bytes     | Decimal   | Hexadecimal       | Binary            |
    +-----------+-----------+-------------------------------+-------------------+
    | 16        | 2         | 65535     | FFFF              | 1111111111111111  |
    +-----------+-----------+-----------+-------------------+-------------------+

                +-------------------------------------------------------+
                | Access Mask Details                                   |
                +-----------+-----------+-----------+-------------------+
                | Create    | Read      | Update    | Delete            |
    +-----------+-----------+-----------+-----------+-------------------+-------+
    | Dec       |   1       |   2       |   4       |   8               |  16   |
    +-----------+-----------+-----------+-----------+-------------------+-------+
    | Hex       |   1       |   2       |   4       |   8               |   F   |
    +-----------+-----------+-----------+-----------+-------------------+-------+
    | Bin       |   0001    |   0010    |   0100    |   1000            | 1111  |
    +-----------+-----------+-----------+-----------+-------------------+-------+
    | Risk      | Permissive| Moderate  | Moderate  |   Severe          |
    +-----------+-----------+-----------+-----------+-------------------+

    +-------------------------------------------------------+
    | Roles Mask Details                                    |
    +-----------+-----------+-----------+-------------------+
    | Special   | Owner     | Groups    | World             |
    +-----------+-----------+-----------+-------------------+
    |   0000    >   0000    >  0000     >   0000            |
    +-------------------------------------------------------+

collection
    |
    |-> owner: admin                ->  Set in model schema or by default root.
    |-> group: admin                —>  Set in model schema or by default root.
    |-> permissions:639             ->  Set in model schema or by default 639.
    |--—- document
        |
        |-> owner: pepito           ->  The user released the saved at this document
        |                               or set in save query options by default inherits from collection.
        |-> group: admin,           ->  The group user released the saved at this document
        |                               or set in save query options by default inherits from collection.
        |-> permissions: 639        ->  Set in save query options by default inherits from collection.
        |
        |---- fields:
            |-> owner: pepito       ->  Set in model schema or by default inherits from document
            |-> group: admin        ->  Set in model schema or by default inherits from document
            |-> permissions: 639    ->  Set in model schema or by default inherits from document

*/

const q = require('q');

module.exports = function(utils) {
    const _ = require('underscore'),
        maps = {
            roles: 'wgo',
            access: 'crud',
            special: 'tsk'
        },
        parseMask = function(mask) {
            return utils.isString(mask) ?
                (/^[0-9A-F]{1,4}$/.test(mask) ?
                    utils.hex2dec(mask) :
                    utils.symbolMask(mask, maps.roles, maps.access, maps.special)) :
                mask;
        },
        parseOwner = function(ownergroups, groups) {
            var ogroups = (ownergroups || '').split(':');
            return {
                owner: ogroups[0] || 'root',
                groups: groups ? groups : (ogroups[1] || 'root').split('+')
            }
        },
        formatOwner = function(ogroups) {
            return [ogroups.owner, ogroups.groups.join('+')].join(':');
        },
        formatJSON = function(json, parent, req) {
            var pop = req || {};
            for (var key in json)
                if (typeof(json[key]) === 'object') {
                    formatJSON(json[key], key, pop);
                } else {
                    pop[parent ? parent + '.' + key : key] = json[key];
                }
            return pop;
        },
        ownership = function ownership(owgroups) {
            var mma = maps.access.split(''),
                owg = typeof(owgroups) === 'string' ? parseOwner(owgroups) : owgroups;
            return function permissions(mask) {
                var umask = parseMask(mask || '0F73');
                return function authorized(user, groups) {
                    var mr = [
                        user !== owg.owner, !!groups.filter(function(group) {
                            return !~owg.groups.indexOf(group);
                        }).length,
                        user === owg.owner
                    ].reduce(function(m, v, i) {
                        return m |= (v << i)
                    });
                    return {
                        check: function(access) {
                            if (user === 'root')
                                return true;

                            var ac = access.split(/[\s\,\+]+/),
                                ma = mma.map(function(vma) {
                                    return ac.filter(function(vac) {
                                        return vac[0] === vma;
                                    }).length;
                                }).reduce(function(m, v, i) {
                                    return m |= (v << i)
                                });
                            return !!(umask & utils.bitMask(mr, ma, maps.roles.length, maps.access.length));
                        },
                        ownership: function(owgroups, _mask) {
                            return ownership(_.extend(parseOwner(owgroups), owg))(_mask)(user, groups);
                        }
                    };
                };
            }
        },
        checkFields = function(fields, auth, action) {
            var checked = [
                [],
                []
            ]
            _.each(fields, function(field, path) {
                var options = (field.options || {}),
                    fauth = auth.ownership(options.ownership, options.permissions);
                checked[fauth.check(action) & 1].push(path);
            });
            return checked;
        },
        filterFields = function(field) {
            return !/^__/.test(field);
        },
        AuthError = utils.inherits(Error, {
            __constructor: function(settings) {
                settings = typeof(settings) === 'string' ? {
                    message: settings
                } : settings || {};
                this.name = 'AuthError';
                this.type = settings.type || 'Application';
                this.message = settings.message || 'An error occurred.';
                this.detail = settings.detail || '';
                this.extendedInfo = settings.extendedInfo || '';
                this.errorCode = settings.errorCode || '';
                Error.captureStackTrace(this, AuthError);
            }
        });

    var _user, _groups;

    return {
        expose: {
            authenticate: function(user, password) {
                var deferred = q.defer();
                console.log('authenticate', user, password);
                deferred.resolve();
                return deferred.promise;
            },
            revoke: function() {

            },
            auth: function(user, groups) {
                _user = user;
                _groups = groups;
            }
        },
        plugin: function(schema, options) {
            var opts = options || {},
                authorizer = ownership(schema.options.ownership)(schema.options.permissions),
                actions = {
                    create: ['save', function(query, next) {
                        var auth = authorizer(_user, _groups),
                            fields, forbidden;
                        console.log(_user, _groups);
                        if (auth.check('create')) {
                            fields = checkFields(schema.paths, auth, 'create');
                            forbidden = _.intersection(_.keys(query._doc), fields[0])[0];
                            if (forbidden)
                                return next(new AuthError('you do not have create access to the following fields: [' + forbidden + ']'));
                            return next();
                        }
                        return next(new AuthError('you do not have create access'));
                    }],
                    read: ['find', 'findOne', function(query, next) {
                        var auth = authorizer(_user, _groups),
                            fields, forbidden;
                        if (auth.check('read')) {
                            fields = checkFields(query.schema.paths, auth, 'read');
                            forbidden = _.intersection(_.uniq(_.keys(query._fields||{}).concat(_.keys(query._conditions))), fields[0])[0];
                            console.log(_user, _groups, forbidden);
                            if (forbidden)
                                return next(new AuthError('you do not have read access to the following fields: [' + forbidden + ']'));
                            query._fields = fields[1].filter(filterFields);
                            return next();
                        }

                        return next(new AuthError('you do not have access to the following model: [' + query.model.modelName + ']'));
                    }],
                    update: ['update', 'findOneAndUpdate', function(query, next) {
                        var auth = authorizer(_user, _groups),
                            fields, forbidden;

                        if (query.options.upsert && auth.check('read update')) {
                            fields = checkFields(query.schema.paths, auth, 'read update');
                            forbidden = _.intersection(_.uniq((query._update || []).concat(_.keys(query._conditions))), fields[0])[0];
                            if (forbidden)
                                return next(new AuthError('you do not have create access to the following fields: [' + forbidden + ']'));
                        }

                        if (query.options.upsert && auth.check('read')) {
                            fields = checkFields(query.schema.paths, auth, 'read update');
                            forbidden = _.intersection(_.uniq((query._fields || []).concat(_.keys(query._conditions))), fields[0])[0];
                            if (forbidden)
                                return next(new AuthError('you do not have create access to the following fields: [' + forbidden + ']'));
                        }
                    }],
                    delete: ['findOneAndRemove', function(query, next) {
                        var auth = authorizer(_user, _groups),
                            fields, forbidden;

                        if (auth.check('read delete')) {
                            fields = checkFields(schema.paths, auth, 'read delete');
                            forbidden = _.intersection(_.keys(query._conditions), fields[0])[0];
                            if (forbidden)
                                return next(new AuthError('you do not have create access to the following fields: [' + forbidden + ']'));
                            return next();
                        }
                        return next(new AuthError('you do not have create access'));
                    }]
                };

            _.each(actions, function(methods) {
                var fn = methods.pop();
                _.each(methods, function(method) {
                    schema.pre(method, function(next) {
                        fn(this, next);
                    });
                })
            });

            schema.statics.chmod = function(mask, query, options) { // TODO
                options = options || {}
                options.recursive = utils.isBoolean(options.recursive) ? options.recursive : false;
            };

            schema.statics.chown = function(mask, query, options) { // TODO
                options = options || {}
                options.recursive = utils.isBoolean(options.recursive) ? options.recursive : false;
            };

            schema.statics.delete = function() {
                return this.remove.apply(this, arguments);
            };

            schema.statics.read = function() {
                return this.find.apply(this, arguments);
            };

            schema.add({
                o: {
                    type: String,
                    default: function() {
                        return formatOwner({
                            owner: _user,
                            groups: _groups
                        });
                    }
                },
                p: {
                    type: String,
                    default: function() {
                        return schema.options.permissions;
                    }
                }
            }, '__');
        }
    }
}


//
// return next(new AuthError('you do not have access to the following model: [' + query.model.modelName + ']'));
//
// var vm = schema;
// var authorizedFields = [];
// var authorizedReturnFields = [];
// if (vm.options && vm.options.authLevel) {
//     if (vm.options.upsert && !vm.schema.permissions[vm.options.authLevel].save) {
//         //check to see if 'upsert: true' option is set, then verify if group has save permission
//         return next({
//             message: 'permission denied',
//             reason: 'you do not have access to the following permissions: [save]'
//         });
//     }
//     if (vm.schema.permissions[vm.options.authLevel] && vm.schema.permissions[vm.options.authLevel].write) {
//         //check to see if group has any write permissions and add to the authorizedFields array
//         authorizedFields = authorizedFields.concat(vm.schema.permissions[vm.options.authLevel].write);
//     }
//     if (vm.schema.permissions.defaults && vm.schema.permissions.defaults.write) {
//         //check to see if there are any default write permissions and add to the authorizedFields array
//         authorizedFields = authorizedFields.concat(vm.schema.permissions.defaults.write);
//     }
//
//     //create an update object that has been sanitized based on permissions
//     var sanitizedUpdate = {};
//     authorizedFields.forEach(function(field) {
//         sanitizedUpdate[field] = vm._update[field];
//     });
//
//     //check to see if the group is trying to update a field it does not have permission to
//     var discrepancies = _.difference(Object.keys(vm._update), Object.keys(sanitizedUpdate));
//     if (discrepancies[0]) {
//         //if a group is searching by a field they do not have access to, return an error
//         return next({
//             message: 'permission denied',
//             reason: 'you do not have access to the following fields: [' + discrepancies.toString() + ']'
//         });
//     } else {
//
//         //Detect which fields can be returned if 'new: true' is set
//         if (vm.schema.permissions[vm.options.authLevel] && vm.schema.permissions[vm.options.authLevel].read) {
//
//             //check to see if the group has any read permissions and add to the authorizedFields array
//             authorizedReturnFields = authorizedReturnFields.concat(vm.schema.permissions[vm.options.authLevel].read);
//         }
//         if (vm.schema.permissions.defaults && vm.schema.permissions.defaults.read) {
//
//             //check to see if there are any default read permissions and add to the authorizedFields array
//             authorizedReturnFields = authorizedReturnFields.concat(vm.schema.permissions.defaults.read);
//         }
//
//         //create a sanitizedReturnFields object that will be used to return only the fields that a group has access to read
//         var sanitizedReturnFields = {};
//         authorizedReturnFields.forEach(function(field) {
//             sanitizedReturnFields[field] = 1;
//         });
//         vm._fields = sanitizedReturnFields;
//         return next();
//     }
// } else {
//     return next();
// }


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
