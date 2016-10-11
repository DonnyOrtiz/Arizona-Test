(function (app) {
    'use strict';

    app.controller('repairFindOrderCtrl', repairFindOrderCtrl);

    repairFindOrderCtrl.$inject = ['$scope', 'apiService', 'notificationService'];
    function repairFindOrderCtrl($scope, apiService, notificationService) {
        $scope.pageClass = 'page-parts';
        $scope.loading = false;
        $scope.filterOrders = '';
        $scope.search = search;
        $scope.clearSearch = clearSearch;
        $scope.searchResults = {
            data: [],
            columnDefs: [
                {
                    name: 'Document',
                    field: 'RO_NUMBER',
                    cellTemplate: '<a href="#/repair/editOrder/{{COL_FIELD}}" class="btn">{{COL_FIELD}}</a>'
                },
                { name: 'Type', field: 'REPAIR_TYPE' },
                { name: 'Created', field: 'DATE_CREATED' },
                { name: 'Vendor', field: 'VENDOR_NUMBER'},
                { name: 'Approval', field: 'APPROVAL_STATUS' }
            ]
        }

        function search() {
            $scope.loading = true;
            if ($scope.filterParts !== null)
                apiService.get('/api/repair/findOrders?docNo=' + $scope.filterOrders, null, searchLoadCompleted, searchLoadFailed);
        }

        function searchLoadCompleted(result) {
            if (!$scope.searchResults) return;

            $scope.searchResults.data = result.data.data[0].results;
            $scope.loading = false;

            if ($scope.searchResults.data !== null) {
                notificationService.displayInfo($scope.searchResults.data.length + ' documents found...');
            } else {
                notificationService.displayError('no repair orders found...');
            }
        }

        function searchLoadFailed(response) {
            notificationService.displayError("Unable to load documents: " + response.message);
        }

        function clearSearch() {
            $scope.filterParts = '';
            $scope.searchResults.data = [];
        }
    }

})(angular.module('ArizonaClientApp'));