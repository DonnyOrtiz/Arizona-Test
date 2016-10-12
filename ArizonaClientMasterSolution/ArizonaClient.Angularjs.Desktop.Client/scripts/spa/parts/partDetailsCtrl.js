(function (app) {
    'use strict';

    app.controller('partDetailsCtrl', partDetailsCtrl);

    partDetailsCtrl.$inject = ['$scope', '$location', '$routeParams', '$modal', 'apiService', 'notificationService'];

    function partDetailsCtrl($scope, $location, $routeParams, $modal, apiService, notificationService) {
        $scope.pageClass = 'page-parts';
        $scope.part = {};
        $scope.filterStock = {};
        $scope.loadingPart = true;
        $scope.loadingHistory = true;
        $scope.isReadOnly = true;
        $scope.openPartDialog = openPartDialog;
        $scope.ReturnPart = ReturnPart;
        $scope.partHistory = [];
        $scope.getStatusColor = getStatusColor;
        $scope.isAvailable = isAvailable;

        function loadPart() {
            $scope.loadingPart = true;
            $scope.loadingHistory = false;
            apiService.get('/api/parts/part?partId=' + $routeParams.id, null, partLoadCompleted, partLoadFailed);
        }

        function loadPartHistory() {
            $scope.loadingHistory = true;
            apiService.get('/api/parts/history?partId=' + $routeParams.id, null, partHistoryLoadCompleted, partHistoryLoadFailed);
        }

        function loadPartDetails() {
            loadPart();
            loadPartHistory();
        }

        function ReturnPart(partId) {
            apiService.post('/api/parts/return?partId=' + partId, null, returnPartSucceeded, returnPartFailed);
        }

        function isAvailable(part)
        {
            return part.status === 1 || part.status === 2 ;
        }

        function getStatusColor(status) {
            if (status === 1 )
                return 'red';
            else {
                return 'green';
            }
        }

     function partLoadCompleted(result) {
            var p = result.data.data[0].parts[0];
            $scope.part = p;
            $scope.loadingPart = false;
        }

        function partLoadFailed(response) {
            var r = response.data.data[0] || response.data.data;
            notificationService.displayError(r.message);
        }

        function partHistoryLoadCompleted(result) {
            var r = result.data.data[0] || result.data.data;
            console.log(r);
            $scope.partHistory = r.results;
            $scope.loadingHistory = false;
        }

        function partHistoryLoadFailed(response) {
            var r = response.data.data[0] || response.data.data;
            console.log(r);
            notificationService.displayError(r.message);
        }

        function returnPartSucceeded(response) {
            console.log(response);
            notificationService.displaySuccess('Part status updated succeesfully');
            loadPartDetails();
        }

        function returnPartFailed(response) {
            console.log(response);
            notificationService.displayError(response.message);
        }

        function openPartDialog() {
            $modal.open({
                templateUrl: '/scripts/spa/parts/updatePartModal.html',
                controller: 'updatePartStockCtrl',
                scope: $scope
            }).result.then(function ($scope) {
                loadPartDetails();
            }, function () {
            });
        }

        loadPartDetails();
    }

})(angular.module('ArizonaClientApp'));