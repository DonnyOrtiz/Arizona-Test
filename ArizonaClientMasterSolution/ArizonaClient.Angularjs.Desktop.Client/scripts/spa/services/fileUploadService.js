/// <reference path="/scripts/_references.js"/>
(function (app) {
    'use strict';

    app.factory('fileUploadService', fileUploadService);

    fileUploadService.$inject = ['$rootScope', '$http', '$timeout', '$upload', 'apiService' , 'notificationService'];

    function fileUploadService($rootScope, $http, $timeout, $upload, apiService, notificationService) {

        $rootScope.upload = [];

        var service = {
            uploadImage: uploadImage,
            uploadImageFile: uploadImageFile
    }

        function uploadImageFile(file, partId, callback) {

            if (file === null) {
                notificationService.displayError('unable to load file! ');
                return;
            }

            apiService.post('/api/parts/imageupload', { "ID" : partId, "ImagePath" : file }, function () {
                notificationService.displaySuccess('file uploaded successfully');
                callback();
            }, function() {
                notificationService.displayError('unable to upload file! ');
            });
        }

        function uploadImage($files, partId, callback) {
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                uploadImageFile($file, partId, callback);
            }
        }

        return service;
    }

})(angular.module('common.core'));