define(['app'], function(app) {
    app.controller('userListCtrl', function($scope, $filter) {

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
                url: '/api/user/query'
            },
            sAjaxDataProp: 'data',
            sPaginationType: 'full_numbers',
            serverSide: true,
            processing: true
        };

        self.tableGridColumns = [{
            data: 'avatar',
            title: $filter('translate')('AVATAR'),
            sortable: true,
            render: function(data, type, full, meta) {
                return '<span class="client-avatar"><img alt="image" src="media/' +
                (Math.floor(Math.random() * 10)%2===0 ? 'no_avatar_man.png' : 'no_avatar_woman.png') +
                '"></span>';
            }
        }, {
            data: 'name',
            title: $filter('translate')('NAME'),
            sortable: true,
            render: function(data, type, full, meta) {
                return full.name.first + ' ' + (full.name.last||'');
            }
        }, {
            data: 'email',
            title: $filter('translate')('EMAIL'),
            sortable: true
        }, {
            data: 'status',
            searchable: false,
            title: $filter('translate')('STATUS'),
            render: function(data, type, full, meta) {
                return data ?
                    '<span class="label label-primary">Active</span>' :
                    '<span class="label">Deactive</span>';
            }
        }];
    });
});
