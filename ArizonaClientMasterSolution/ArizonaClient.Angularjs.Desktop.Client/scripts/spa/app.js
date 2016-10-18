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
            .otherwise({ redirectTo: "/" });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'membershipService'];
    function run($rootScope, $location, $cookieStore, $http, membershipService) {
        $rootScope.phoenix_constants = {
             url: "http://localhost",
             port: 2831,
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
        console.log("starting pass data using " + $location.search().Passthrough)
        if ($location.search().Passthrough) {
            membershipService.passthrough($location.search().Passthrough,
                function (result) {
                    var r = result;
                    console.log(r);
                    if (r.data.data[0].success) {
                        membershipService.saveCredentials($rootScope.user, r);
                        $rootScope.userData.displayUserInfo();
                        //if ($rootScope.previousState)
                        //    $location.path($rootScope.previousState);
                        //else
                        //    $location.path('/');
                    }
                    else {
                        notificationService.displayError('Authentication failed.' + r.message);
                    }
                });
        }
    }

})();