const
    q = require('q'),
    getSearchableFields = function(params) {
        return params.columns.filter(function(column) {
            return JSON.parse(column.searchable);
        }).map(function(column) {
            return column.data;
        });
    },
    isNaNorUndefined = function() {
        var args = Array.prototype.slice.call(arguments);
        return args.some(function(arg) {
            return isNaN(arg) || (!arg && arg !== 0);
        });
    },
    buildFindParameters = function(params) {

        if (!params || !params.columns || !params.search || (!params.search.value && params.search.value !== '')) {
            return null;
        }

        var searchText = params.search.value,
            findParameters = {},
            searchRegex,
            searchOrArray = [];

        if (searchText === '') {
            return findParameters;
        }

        searchRegex = new RegExp(searchText, 'i');

        var searchableFields = getSearchableFields(params);

        if (searchableFields.length === 1) {
            findParameters[searchableFields[0]] = searchRegex;
            return findParameters;
        }

        searchableFields.forEach(function(field) {
            var orCondition = {};
            orCondition[field] = searchRegex;
            searchOrArray.push(orCondition);
        });

        findParameters.$or = searchOrArray;

        return findParameters;
    },
    buildSortParameters = function(params) {
        if (!params || !Array.isArray(params.order) || params.order.length === 0) {
            return null;
        }

        var sortColumn = Number(params.order[0].column),
            sortOrder = params.order[0].dir,
            sortField;

        if (isNaNorUndefined(sortColumn) || !Array.isArray(params.columns) || sortColumn >= params.columns.length) {
            return null;
        }

        if (params.columns[sortColumn].orderable === 'false') {
            return null;
        }

        sortField = params.columns[sortColumn].data;

        if (!sortField) {
            return null;
        }

        if (sortOrder === 'asc') {
            return sortField;
        }

        return '-' + sortField;
    };

module.exports = function(utils) {
    return {
        plugin: function(schema, options) {

            schema.statics.datatable = function(params) {
                var self = this,
                    deferred = q.defer(),
                    draw = Number(params.draw),
                    start = Number(params.start),
                    length = Number(params.length),
                    findParameters = buildFindParameters(params),
                    sortParameters = buildSortParameters(params);

                if (isNaNorUndefined(draw, start, length)) {
                    deferred.reject(new Error('Some parameters are missing or in a wrong state. ' +
                        'Could be any of draw, start or length'));
                    return deferred.promise;
                }
                if (!findParameters || !sortParameters) {
                    deferred.reject(new Error('Invalid findParameters or sortParameters'));
                    return deferred.promise;
                }

                self.count({}).then(function(count) {
                    self.find(findParameters)
                        .limit(length)
                        .skip(start)
                        .sort(sortParameters)
                        .exec(function(err, results){
                            if(err)
                                return deferred.reject(err);
                            deferred.resolve({
                                draw: draw,
                                recordsTotal: count,
                                recordsFiltered: results.length,
                                data: results
                            });
                        });
                }, deferred.reject);
                return deferred.promise;
            };
        }
    }
}
