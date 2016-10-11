(function (app) {
    'use strict';

    app.controller('partAddCtrl', partAddCtrl);

    partAddCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'apiService', 'notificationService', 'fileUploadService'];

    function partAddCtrl($rootScope, $scope, $location, $routeParams, apiService, notificationService, fileUploadService) {

        $scope.pageClass = 'page-parts';
        $scope.part = { Borrowed: false, Status: 0 };

        $scope.isReadOnly = false;
        $scope.AddPart = AddPart;
        $scope.prepareFiles = prepareFiles;
        $scope.openDatePicker = openDatePicker;

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.datepicker = {};

        var partImage = null;
        var partImages = [];

        function AddPart() {
            AddPartModel();
        }

        function AddPartModel() {
            apiService.post('/api/parts/save', $scope.part, addPartSucceded, addPartFailed);
        }

        function prepareFiles() {
            var preview = $('#imgPreview');
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();

            reader.onloadend = function() {
                reader.readAsDataURL(file);
                partImage = (reader.result);
                preview.src = reader.result === null ? '' : reader.result;
            }
        }

        function addPartSucceded(response) {
            var r = response.data.data[0] || response.data.data;
            notificationService.displaySuccess($scope.part.title + ' has been submitted to ' + $rootScope.blueprint_constants.app_name);
            $scope.part = r.parts[0];

            if (r.success) {
                var file = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                partImage = reader.result;
                fileUploadService.uploadImageFile(partImage, $scope.part.ID, redirectToEdit);
            } else {
                notificationService.displayError("Unable to save part image! " + result.statusText);
                redirectToEdit();
            }
        }

        function addPartFailed(result) {
            var r = result.message;
            console.log(r);
            notificationService.displayError(r + result.statusText);
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.datepicker.opened = true;
        };

        function redirectToEdit() {
            $location.url('parts/edit/' + $scope.part.ID);
        }
    }

})(angular.module('ArizonaClientApp'));