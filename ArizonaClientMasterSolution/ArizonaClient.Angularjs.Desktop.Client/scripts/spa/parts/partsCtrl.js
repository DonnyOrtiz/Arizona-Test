(function (app) {
    'use strict';

    app.controller('partsCtrl', partsCtrl);

    partsCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

    function partsCtrl($scope, apiService, notificationService) {
        $scope.pageClass = 'page-parts';
        $scope.loadingParts = true;
        $scope.Parts = [];
        $scope.search = search;
        $scope.clearSearch = clearSearch;
        $scope.loadPartGridData = loadPartGridData;

        $scope.partGridData = [];
        

        function search() {
            $scope.loadingParts = true;
            if ($scope.filterParts !== null)
                apiService.get('/api/parts/search?search='+ $scope.filterParts, null, partsLoadCompleted, partsLoadFailed);
            else 
                apiService.get('/api/parts/parts', null, partsLoadCompleted, partsLoadFailed);
        }

        function partsLoadCompleted(result) {
            var r = result.data.data[0] || result.data.data;
            
            $scope.partGridData.columnDefs = [
            {
                name: 'Hyperlink',
                field: 'ID',
                cellTemplate: '<a href="#/parts/details/{{COL_FIELD}}" class="btn">Open {{COL_FIELD}}</a>'
            },
            { name: 'description' },
            { name: 'amount' },
            { name: 'status' },
            { name: 'title' },
            { name: 'borrowed' }
            ];

            $scope.partGridData.data = r.parts;
            $scope.loadingParts = false;

            if (r.parts !== null) {
                notificationService.displayInfo(r.parts.length + ' parts found...');
                notificationService.displaySuccess('done.');
            } else {
                notificationService.displayError('no parts found...');
            }
        }

        function loadPartGridData() {
            apiService.get('/api/parts/parts', null, partsLoadCompleted, partsLoadFailed);
        }

        function partsLoadFailed(response) {
            notificationService.displayError("Unable to load parts: " + response.message);
        }

        function clearSearch() {
            $scope.filterParts = '';
            search();
        }

        $scope.loadPartGridData();
    }

})(angular.module('ArizonaClientApp'));