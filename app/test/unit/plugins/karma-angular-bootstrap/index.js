!(function(global) {
    global.__karma__.start = (function(originalStartFn) {
        return function() {
            var args = arguments;

            angular.element(document).ready(function() {
                global.setTimeout(function() {
                    console.log('Start Karma');
                    originalStartFn.apply(null, args);
                });
            });
        };
    }(global.__karma__.start));
})(this);
