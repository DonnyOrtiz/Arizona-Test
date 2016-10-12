/// <reference path="/scripts/_references.js"/>

(function (app) {
    'use strict';

    app.factory('apiService', apiService);

    apiService.$inject = ['$http', '$location', 'notificationService','$rootScope', '$cookieStore'];

    function apiService($http, $location, notificationService, $rootScope, $cookieStore) {
        var service = {
            get: get,
            post: post,
            destroy: destroy
        };

        function get(url, config, success, failure) {
            var request = $rootScope.blueprint_constants.url + ":" + $rootScope.blueprint_constants.port + url;
            console.log("get:" + request);

            return $http.get(request, config, success, failure)
                    .then(function (result) {
                        success(result);
                        console.log(result.data || result);

                    $http.defaults.headers.common['x-blue-token'] = result.data.meta.token;
                    $http.defaults.headers.common['x-blue-nonce'] = result.data.meta.nonce;
                    $http.defaults.headers.common['x-blue-auth'] = result.data.meta.cookie;

                }, function (error) {
                        if (error.status === '401') {
                            notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            notificationService.displayError('Unknown error!\n' + error);
                            failure(error);
                        }
                    });
        }

        function post(url, data, success, failure) {
            console.log("post:" + $rootScope.blueprint_constants.url + ":" + $rootScope.blueprint_constants.port + url + data);
            
            return $http.post($rootScope.blueprint_constants.url + ":" + $rootScope.blueprint_constants.port + url, data)
                    .then(function (result) {
                        success(result);
                        console.log(result.data || result);

                        $http.defaults.headers.common['x-blue-token'] = result.data.meta.token;
                        $http.defaults.headers.common['x-blue-nonce'] = result.data.meta.nonce;
                        $http.defaults.headers.common['x-blue-auth'] = result.data.meta.cookie;

                    }, function (error) {
                        if (error.status === '401') {
                            notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            notificationService.displayError('Unknown error!\n'+ error);
                            failure(error);
                        }
                    });
        }

        function destroy(url, data, success, failure) {
            console.log("destroy:" + $rootScope.blueprint_constants.url + ":" + $rootScope.blueprint_constants.port + url);

            return $http.delete($rootScope.blueprint_constants.url + ":" + $rootScope.blueprint_constants.port + url, data)
                    .then(function (result) {
                        success(result);
                        console.log(result.data || result);

                        $http.defaults.headers.common['x-blue-token'] = result.data.meta.token;
                        $http.defaults.headers.common['x-blue-nonce'] = result.data.meta.nonce;
                        $http.defaults.headers.common['x-blue-auth'] = result.data.meta.cookie;

                    }, function (error) {
                        if (error.status === '401') {
                            notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            notificationService.displayError('Unknown error!\n' + error);
                            failure(error);
                        }
                    });
        }

        return service;
    }

})(angular.module('common.core'));