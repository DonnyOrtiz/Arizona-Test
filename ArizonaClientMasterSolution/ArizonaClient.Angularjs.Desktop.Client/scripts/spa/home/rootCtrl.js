(function (app) {
    'use strict';

    app.controller('rootCtrl', rootCtrl);

    rootCtrl.$inject = ['$scope','$location', 'membershipService','$rootScope'];
    function rootCtrl($scope, $location, membershipService, $rootScope) {
        $rootScope.userData = {};
        $rootScope.userData.displayUserInfo = displayUserInfo;
        $scope.logout = logout;
        
        function displayUserInfo() {
            $rootScope.userData.isUserLoggedIn = membershipService.isUserLoggedIn();

            if($rootScope.userData.isUserLoggedIn)
            {
                $rootScope.username = $rootScope.repository.loggedUser.username;
            }
        }

        function logout() {
            membershipService.removeCredentials();
            $location.path('#/');
            $rootScope.userData.displayUserInfo();
        }

        $rootScope.userData.displayUserInfo();
    }

})(angular.module('ArizonaClientApp'));