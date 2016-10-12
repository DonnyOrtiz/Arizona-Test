(function () {
    'use strict';

    angular.module('ArizonaClientApp', ['common.core', 'common.ui'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "scripts/spa/home/index.html",
                controller: "indexCtrl"
            })
            .when("/about", {
                templateUrl: "scripts/spa/home/about.html",
                controller: "aboutCtrl"
            })
            .when("/login", {
                templateUrl: "scripts/spa/account/login.html",
                controller: "loginCtrl"
            })
            .when("/register", {
                templateUrl: "scripts/spa/account/register.html",
                controller: "registerCtrl"
            })
            .when("/parts", {
                templateUrl: "scripts/spa/parts/parts.html",
                controller: "partsCtrl"
            })
            .when("/parts/add", {
                templateUrl: "scripts/spa/parts/add.html",
                controller: "partAddCtrl",
                resolve: {
                    isAuthenticated: isAuthenticated
                }
            })
            .when("/parts/details/:id", {
                templateUrl: "scripts/spa/parts/details.html",
                controller: "partDetailsCtrl",
                resolve: {
                    isAuthenticated: isAuthenticated
                }
            })
            .when("/repair/findOrders", {
                templateUrl: "scripts/spa/repair/findOrder.html",
                controller: "repairFindOrderCtrl"
            })
            .when("/parts/edit/:id", {
                templateUrl: "scripts/spa/parts/edit.html",
                controller: "partEditCtrl"
            })
           .otherwise({ redirectTo: "/" });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'membershipService'];
    function run($rootScope, $location, $cookieStore, $http, membershipService) {
        $rootScope.blueprint_constants = {
             url: "http://kmphxastg-api.almchi.airliance.com",
             port: 80,
            app_name: "ArizonaClient"
        };

        passthroughAuthentication($rootScope, $location, $http, membershipService);

        $rootScope.repository = $cookieStore.get('repository') || {};
        if ($rootScope.repository.loggedUser) {
            $http.defaults.headers.common['Authorization'] = $rootScope.repository.loggedUser.authdata;
        }

        $(document).ready(function () {


            $(".fancybox").fancybox({
                openEffect: 'none',
                closeEffect: 'none'
            });

            $('.fancybox-media').fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                helpers: {
                    media: {}
                }
            });

            $('[data-toggle=offcanvas]').click(function () {
                $('.row-offcanvas').toggleClass('active');
            });
        });
    }

    isAuthenticated.$inject = ['membershipService', '$rootScope', '$location'];
    function isAuthenticated(membershipService, $rootScope, $location) {
        if (!membershipService.isUserLoggedIn()) {
            $rootScope.previousState = $location.path();
            $location.path('/login');
        }
    }

    passthroughAuthentication.$inject = ['$rootScope', '$location', '$http', 'membershipService'];
    function passthroughAuthentication($rootScope, $location, $http, membershipService) {
        if ($location.search().uid) {
            $rootScope.uid = $location.search().uid;
            membershipService.passthrough($location.search().uid, 
                function (result) {
                    if (result.data.data[0].success) {
                        $rootScope.user = {
                            username: result.data.data[0].authResult.user.u_logon_name,
                            email: result.data.data[0].authResult.user.u_email_address
                        }
                        membershipService.saveCredentials($rootScope.user, result);
                        $http.defaults.headers.common['Authorization'] = $rootScope.repository.loggedUser.authdata;
                        $rootScope.userData.displayUserInfo();
                        $rootScope.$apply;
                    }
                }
                );
        }
    }

})();