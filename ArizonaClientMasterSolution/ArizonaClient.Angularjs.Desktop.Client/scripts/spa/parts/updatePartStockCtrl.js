(function (app) {
    'use strict';

    app.controller('updatePartStockCtrl', updatePartStockCtrl);

    updatePartStockCtrl.$inject = ['$scope', '$modalInstance', '$location', 'apiService', 'notificationService'];

    function updatePartStockCtrl($scope, $modalInstance, $location, apiService, notificationService) {

        $scope.Title = $scope.part.title;
        $scope.loadStockItems = loadStockItems;
        $scope.selectCustomer = selectCustomer;
        $scope.selectionChanged = selectionChanged;
        $scope.updatePart = updatePart;
        $scope.cancelUpdate = cancelUpdate;
        $scope.stockItems = [];
        $scope.selectedCustomer = -1;
        $scope.isEnabled = false;

        function loadStockItems() {
            notificationService.displayInfo('Loading available stock items for ' + $scope.part.title);
            apiService.get('/api/parts/stock?partId=' + $scope.part.ID, null, stockItemsLoadCompleted, stockItemsLoadFailed);
        }

        function stockItemsLoadCompleted(response) {
            var r = result.data.data[0] || result.data.data;
            $scope.stockItems = r.results;
            $scope.selectedStockItem = $scope.stockItems[0].ID;
            console.log(response);
        }

        function stockItemsLoadFailed(response) {
            console.log(response);
            notificationService.displayError(response.data);
        }

        function updatePart() {
            apiService.post('/api/parts/save', null, updatePartSucceeded, updatePartFailed);
        }

        function updatePartSucceeded(response) {
            console.log(response);
            notificationService.displaySuccess('Part update completed successfully');
            $modalInstance.close();
        }

        function updatePartFailed(response) {
            console.log(response);
            notificationService.displayError(response.message);

        }

        function cancelUpdate() {
            $scope.stockItems = [];
            $scope.selectedCustomer = -1;
            $scope.isEnabled = false;
            $modalInstance.dismiss();
        }

        function selectCustomer($item) {
            if ($item) {
                $scope.selectedCustomer = $item.originalObject.ID;
                $scope.isEnabled = true;
            }
            else {
                $scope.selectedCustomer = -1;
                $scope.isEnabled = false;
            }
        }

        function selectionChanged($item) {
        }

        loadStockItems();
    }

})(angular.module('ArizonaClientApp'));