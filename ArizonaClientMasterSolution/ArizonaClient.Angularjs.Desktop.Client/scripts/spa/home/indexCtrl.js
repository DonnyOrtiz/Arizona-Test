(function (app) {
    'use strict';

    app.controller('indexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope', 'homeServices', 'notificationService'];

    function indexCtrl($scope, homeServices, notificationService) {
        $scope.pageClass = 'page-home';
        $scope.loadingParts = true;
        $scope.isReadOnly = true;
        $scope.latestParts = [];
        $scope.loadData = loadData;

        function loadData() {
            homeServices.getPartsLatest('/api/parts/latest', null, partsLoadCompleted, partsLoadFailed);
        }

        function partsLoadCompleted(result) {
            var r = result.data.data[0] || result.data.data;
            $scope.latestParts = r.parts;
            $scope.loadingParts = false;
            notificationService.displaySuccess('done.');
        }
 
        function partsLoadFailed(response) {
            var r = response.data !== null ? (response.data.data[0] || response.data.data) : null;
            notificationService.displayError(r||r.message);
        }

        loadData();
    }
})(angular.module('ArizonaClientApp'));