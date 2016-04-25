define(['app', 'jquery'], function(app, $) {
    app.directive('tableGrid', function($q, $compile, jwtProvider) {
        var defaults = {
            columns: [{
                'data': 'id',
                'title': 'ID',
                'visible': true
            }],
            options: {
                'deferRender': true,
                'ajax': {
                    url: '/api/poll/query',
                    type: 'POST',
                    'headers': {
                        'x-access-token': jwtProvider.getToken()
                    }
                },
                'sAjaxDataProp': 'data',
                'sPaginationType': 'full_numbers',
                'serverSide': true,
                'processing': true
            }
        };

        return {
            replace: true,
            restrict: 'E',
            scope: {
                columns: '=tgColumns',
                options: '=tgOptions'
            },
            templateUrl: 'partial/tableGrid.html',
            controllerAs: '$ctrl',
            controller: function($scope, $element, $timeout) {

                var self = this,
                    dColumns = $q.defer(),
                    dOptions = $q.defer(),
                    sColumns = $.extend(true, [], defaults.columns, []),
                    sOptions = $.extend(true, {}, defaults.options, {
                        drawCallback: function(){
                            $timeout(function(){
                                $scope.$digest();
                            });
                        },
                        rowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            // TODO hacer que el row template pueda ser modificado desde las opciones
                            return $compile(nRow)($.extend($scope.$new(), {
                                row: aData
                            }));
                        }
                    });

                self.dtColumns = dColumns.promise;
                self.dtOptions = dOptions.promise;

                $scope.$watch('columns', function(oColumns, nColumns) {
                    nColumns && dColumns.resolve($.extend(true, sColumns, nColumns));
                }, true);

                $scope.$watch('options', function(oOptions, nOptions) {
                    nOptions && dOptions.resolve($.extend(true, sOptions, nOptions));
                }, true);

            }
        };
    });
});
