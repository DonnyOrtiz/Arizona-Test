(function (app) {
    'use strict';

    app.controller('partEditCtrl', partEditCtrl);

    partEditCtrl.$inject = ['$scope', '$location', '$routeParams', 'apiService', 'notificationService', 'fileUploadService'];

    function partEditCtrl($scope, $location, $routeParams, apiService, notificationService, fileUploadService) {
        $scope.pageClass = 'page-parts';
        $scope.part = {};
        $scope.genres = [];
        $scope.loadingpart = true;
        $scope.isReadOnly = false;
        $scope.Updatepart = Updatepart;
        $scope.prepareFiles = prepareFiles;
        $scope.openDatePicker = openDatePicker;

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.datepicker = {};

        var partImage = null;

        function loadpart() {
            $scope.loadingpart = true;
            apiService.get('/api/parts/part?partId=' + $routeParams.id, null, partLoadCompleted, partLoadFailed);
        }

        function partLoadCompleted(result) {
            var r = result.data.data[0].parts[0] || result.data.data.parts[0];
            $scope.part = r;
            $scope.loadingpart = false;
        }

        function partLoadFailed(response) {
            var r = response.data.data[0] || response.data.data;
            notificationService.displayError(r.message);
        }


        function Updatepart() {
            if (partImage) {
                fileUploadService.uploadImage(partImage, $scope.part.ID, UpdatepartModel);
            }
            else
                UpdatepartModel();
        }

        function UpdatepartModel() {
            apiService.post('/api/parts/save', $scope.part, updatepartSucceded, updatepartFailed);
        }

        function prepareFiles() {
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();

            reader.onloadend = function () {
                reader.readAsDataURL(file);
                partImage = (reader.result);
            }
        }

        function updatepartSucceded(response) {
            var r = response.data.data[0].parts[0] || response.data.data.parts[0];

            if (r.success) {
                var file = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                partImage = reader.result;
                fileUploadService.uploadImageFile(partImage, $scope.part.ID, function() {});
            } else {
                notificationService.displayError(r.message);
            }

            console.log(r);
            notificationService.displaySuccess($scope.part.title + ' has been updated');
            $scope.part = r.part;
            partImage = null;
        }

        function updatepartFailed(response) {
            notificationService.displayError(response.message);
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.datepicker.opened = true;
        };

        loadpart();
    }

})(angular.module('ArizonaClientApp'));