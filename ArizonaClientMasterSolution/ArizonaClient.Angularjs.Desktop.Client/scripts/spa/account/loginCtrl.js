(function (app) {
    'use strict';

    app.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['membershipService', 'notificationService','$rootScope', '$location'];
    function loginCtrl(membershipService, notificationService, $rootScope, $location) {
        $rootScope.pageClass = 'page-login';
        $rootScope.login = login;
        $rootScope.user = {};

        function login() {
            membershipService.login($rootScope.user, loginCompleted);
        }

        function loginCompleted(result) {
            var r = result; 
            console.log(r);
            if (r.data.data[0].success) {
                membershipService.saveCredentials($rootScope.user, r);
                notificationService.displaySuccess('Hello ' + $rootScope.user.username);
                $rootScope.userData.displayUserInfo();
                if ($rootScope.previousState)
                    $location.path($rootScope.previousState);
                else
                    $location.path('/');
            }
            else {
                notificationService.displayError('Login failed. Try again. ' + r.message);
            }
        }
    }

})(angular.module('common.core'));