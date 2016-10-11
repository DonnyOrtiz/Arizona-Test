(function (app) {
    'use strict';

    app.controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$scope', 'membershipService', 'notificationService', '$rootScope', '$location'];

    function registerCtrl($scope, membershipService, notificationService, $rootScope, $location) {
        $scope.pageClass = 'page-login';
        $scope.register = register;
        $scope.user = {};

        function register() {
            membershipService.register($scope.user, registerCompleted);
        }

        function registerCompleted(result) {
            var r = result.data.data[0] || result.data.data;
            if (result.data.success) {
                membershipService.saveCredentials($scope.user, r);
                notificationService.displaySuccess('Hello ' + $scope.user.username);
                $scope.userData.displayUserInfo();
                $location.path('/');
            }
            else {
                notificationService.displayError('Registration failed. Try again.' + r.message);
            }
        }
    }

})(angular.module('common.core'));