define([], function() {
    return function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "views/common/content.html",
            })
            .state('home.main', {
                url: "/main",
                templateUrl: "view/main.html",
                data: {
                    pageTitle: 'Home'
                }
            })
            .state('home.minor', {
                url: "/minor",
                templateUrl: "view/minor.html",
                data: {
                    pageTitle: 'Example view'
                }
            })
            .state('sign-in', {
                url: "/sign-in",
                templateUrl: "view/sign-in.html",
                data: {
                    pageTitle: 'Sign In',
                    specialClass: 'gray-bg'
                }
            })

        $urlRouterProvider
            .otherwise("/home");
    };
});
