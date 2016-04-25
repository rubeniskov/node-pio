define(['app', 'moment'], function(app, moment) {
    app.controller('pollListCtrl', function($scope, $filter) {

        var self = this;

        $scope.pieChart = {
            options: {
                delimiter: null,
                fill: ['#ec4758', '#1ab394', '#f3f3f4'],
                height: null,
                radius: 20,
                width: null

            },
            data: [Math.random(),Math.random(),Math.random()]
        };

        self.tableGridOptions = {
            ajax: {
                url: '/api/poll/query'
            },
            sAjaxDataProp: 'data',
            sPaginationType: 'full_numbers',
            serverSide: true,
            processing: true
        };

        self.tableGridColumns = [{
            data: '__at',
            sortable: false,
            visible: false
        }, {
            data: 'title',
            title: $filter('translate')('TITLE'),
            sortable: true,
            render: function(data, type, full, meta) {
                // Today 2:40 pm - 24.06.2014
                /// moment().format('MMMM Do YYYY, h:mm:ss a')
                return '' +
                    '<a ui-sref="app.admin.poll.details({id: 0})" class="faq-question">{{row.title}}</a>' +
                    '<small>Added by <strong>Alex Smith</strong> <i class="fa fa-clock-o"></i> ' + moment(full.__at.c).format('MMMM Do YYYY, h:mm:ss a') + '</small>';
            }
        }, {
            data: 'tags',
            title: $filter('translate')('TAGS'),
            sortable: true,
            render: function(data, type, full, meta) {
                return '' +
                    '<span class="small font-bold">Robert Nowak</span>' +
                    '<div class="tag-list">' +
                    '    <span class="tag-item">General</span>' +
                    '    <span class="tag-item">License</span>' +
                    '</div>';
            }
        }, {
            data: 'summary',
            title: $filter('translate')('SUMMARY'),
            render: function(data, type, full, meta) {
                return '<pie-chart data="$parent.$parent.pieChart.data" options="$parent.$parent.pieChart.options"></pie-chart>';
            }
        }];
    });
});
