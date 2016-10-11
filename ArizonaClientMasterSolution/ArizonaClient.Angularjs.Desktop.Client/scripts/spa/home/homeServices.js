/// <reference path="/scripts/_references.js"/>

(function (app) {
    'use strict';

    app.factory('homeServices', homeServices);

    homeServices.$inject = ['$http', '$location', 'apiService', 'notificationService'];

    function homeServices($http, $location, apiService, notificationService) {

        var service = {
            getPartsLatest: getPartsLatest
        };

        function getPartsLatest(url, config, success, failure) {
            var res = apiService.get(url, config, success, failure);
            notificationService.displayInfo('loading parts...');
            return res;
        }

    

        return service;
    }

})(angular.module('ArizonaClientApp'));