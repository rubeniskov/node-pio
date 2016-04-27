define([], function() {
    return function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'view/app.html',
                abstract: true,
                data: {
                    pageTitle: '{{ "DASHBOARD" | translate }}',
                    requiresLogin: true
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                ncyBreadcrumb: {
                    label: '{{ "DASHBOARD" | translate }}'
                },
                data: {
                    pageTitle: '{{ "DASHBOARD" | translate }}'
                },
                views: {
                    'main-view': {
                        templateUrl: 'view/dashboard.html',
                    }
                }
            })
            .state('app.polltray', {
                url: '/polltray',
                data: {
                    pageTitle: '{{ "POLLTRAY" | translate }}',
                    requiresLogin: true
                },
                views: {
                    'main-view': {
                        templateUrl: 'view/poll-tray.html',
                    }
                }
            })
            .state('app.admin', {
                url: '/admin',
                abstract: true,
                ncyBreadcrumb: {
                    label: '{{ "ADMINISTRATION" | translate }}'
                },
                data: {
                    pageTitle: '{{ "ADMINISTRATION" | translate }}',
                    requiresAdmin: true
                },
                views: {
                    'top-view': {
                        templateUrl: 'partial/breadcrumb.html',
                    },
                    'main-view': {
                        templateUrl: 'view/admin.html',
                    },
                    'footer-view': {
                        templateUrl: 'partial/footer.html',
                    }
                }
            })
            // POLL ADMINISTRATION
            .state('app.admin.poll', {
                url: '/poll',
                ncyBreadcrumb: {
                    label: '{{ "POLLS" | translate }}'
                },
                data: {
                    pageTitle: 'Create Poll'
                },
                views: {
                    'main-view@app': {
                        controller: 'pollListCtrl as $ctrl',
                        templateUrl: 'view/poll-list.html'
                    }
                }
            })
            .state('app.admin.poll.create', {
                url: '/create',
                ncyBreadcrumb: {
                    label: '{{ "CREATE" | translate }}'
                },
                data: {
                    pageTitle: '{{ "CREATE_POLL" | translate }}'
                },
                views: {
                    'main-view@app': {
                        controller: 'pollCreateCtrl as $ctrl',
                        templateUrl: 'view/poll-create.html',
                    }
                }
            })
            .state('app.admin.poll.details', {
                url: '/{id}',
                ncyBreadcrumb: {
                    label: '#{{$root.$state.params.id}}'
                },
                data: {
                    pageTitle: '{{ "POLL_DETAILS" | translate }} #{{$root.$state.params.id}}'
                },
                views: {
                    'main-view@app': {
                        controller: 'pollDetailsCtrl as $ctrl',
                        templateUrl: 'view/poll-detail.html',
                    }
                }
            })
            // USER ADMINISTRATION
            .state('app.admin.user', {
                url: '/user',
                ncyBreadcrumb: {
                    label: '{{ "USERS" | translate }}'
                },
                data: {
                    pageTitle: '{{ "USERS" | translate }}'
                },
                views: {
                    'main-view@app': {
                        controller: 'userListCtrl as $ctrl',
                        templateUrl: 'view/user-list.html',
                    }
                }
            })
            .state('app.admin.user.create', {
                url: '/create',
                ncyBreadcrumb: {
                    label: '{{ "CREATE" | translate }}'
                },
                data: {
                    pageTitle: '{{ "CREATE_USER" | translate }}'
                },
                views: {
                    'main-view@app': {
                        controller: 'userCreateCtrl as $ctrl',
                        templateUrl: 'view/user-create.html'
                    }
                }
            })
            .state('app.admin.user.details', {
                url: '/{id}',
                ncyBreadcrumb: {
                    label: '#{{$root.$state.params.id}}'
                },
                data: {
                    pageTitle: '{{ "USER_DETAILS" | translate }} #{{$root.$state.params.id}}'
                },
                views: {
                    'main-view@app': {
                        templateUrl: 'view/user-detail.html',
                    }
                }
            })
            .state('sign-in', {
                url: '/sign-in',
                data: {
                    pageTitle: 'Sign In',
                    specialClass: 'gray-bg'
                },
                views: {
                    '': {
                        templateUrl: 'view/sign-in.html'
                    }
                },
                resolve: {
                    redirect: function($q, $state, $injector, $timeout) {
                        var deferred = $q.defer(),
                            jwt = $injector.get('jwtProvider');
                        $timeout(function() {
                            if (jwt.isTokenExpired()) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                                $state.go('app.dashboard');
                            }
                        });
                        return deferred.promise;
                    }
                }
            });

        $urlRouterProvider
            .otherwise('/app/dashboard');

        // $locationProvider
        //     .hashPrefix('')
    };
});
