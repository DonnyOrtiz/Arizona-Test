(function (app) {
    'use strict';

    app.controller('indexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope', 'notificationService'];

    function indexCtrl($scope, notificationService) {
        $scope.pageClass = 'page-home';
        $scope.isReadOnly = true;
    }
})(angular.module('ArizonaClientApp'));