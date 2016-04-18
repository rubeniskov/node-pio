define(['app'], function(app) {
    app.controller('userListCtrl', function($scope, $filter) {

        var self = this;

        $scope.pieChart = {
            options: {
                delimiter: null,
                fill: ["#ec4758", "#1ab394", "#f3f3f4"],
                height: null,
                radius: 20,
                width: null

            },
            data: [Math.random(),Math.random(),Math.random()]
        }

        self.tableGridOptions = {
            sAjaxDataProp: 'data',
            sPaginationType: 'full_numbers',
            serverSide: true,
            processing: true
        }

        self.tableGridColumns = [{
            data: 'id',
            title: $filter('translate')('ID'),
            sortable: true,
            visible: false
        }, {
            data: 'avatar',
            title: $filter('translate')('AVATAR'),
            sortable: true,
            render: function(data, type, full, meta) {
                return '<span class="client-avatar"><img alt="image" src="media/' + 
                (Math.floor(Math.random() * 10)%2===0 ? 'no_avatar_man.png' : 'no_avatar_woman.png') 
                + '"></span>';
            }
        }, {
            data: 'name',
            title: $filter('translate')('NAME'),
            sortable: true,
            render: function(data, type, full, meta) {
                return 'Ignacio Fernandez';
            }
        }, {
            data: 'email',
            title: $filter('translate')('EMAIL'),
            sortable: true,
            render: function(data, type, full, meta) {
                return 'ifernandez@gmail.com';
            }
        }, {
            data: 'status',
            title: $filter('translate')('STATUS'),
            render: function(data, type, full, meta) {
                return '<span class="label label-primary">Active</span>';
            }
        }];
    });
});
