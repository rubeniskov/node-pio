define(['app'], function(app) {
    app.controller('mainCtrl', ['$rootScope', function($rootScope) {
        $rootScope.PieChart = {
            data: [1, 2, 3, 4],
            options: {
                diameter: 150,
                fill: ['#ff9900', '#fff4dd', '#ffd592'],
                height: null,
                radius: 8,
                width: null
            }
        };
    }]);
});
