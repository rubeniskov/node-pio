define(['app', 'underscore'], function(app, _) {
    app.directive('chairGraph', function() {
        var connectionStates = [
                'disconnected',
                'connected'
            ],
            responseStates = [
                'disagree',
                'agree',
                'abstention'
            ];
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'partial/chairGraph.html',
            scope: {
                data: '=cgData'
            },
            controller: function($scope, $element) {
                $scope._data = _.map(new Array(30), function() {
                    return {
                        response: Math.round(Math.random() * 4) - 1, // -1
                        connection: Math.round(Math.random() * 1), // 1 connection status
                        user: {
                            name: 'test'
                        }
                    }
                });

                $scope.getStateClass = function(host) {
                    return [
                        connectionStates[host.connection],
                        responseStates[host.response] || 'unanswered'
                    ].map(function(status){
                        return 'is-' + status
                    }).join(' ');
                };
                console.log($scope.getStateClass($scope._data[Math.round(Math.random()*30)]));
            },
            link: function($scope, $element, $attrs) {
                var self = this;

                // $scope.$watch('_fields', function(ov, nv) {
                //     nv && model.$setViewValue(nv.join(''));
                // }, true);
                //
                // $scope.$watch('fields', function(ov, nv) {
                //     nv && $scope.parseFields(nv);
                // });
            }
        };
    });
});
