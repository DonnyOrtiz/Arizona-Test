/// <reference path="/scripts/_references.js"/>
(function (app) {
    'use strict';

    app.factory('membershipService', membershipService);

    membershipService.$inject = ['apiService', 'notificationService','$http', '$base64', '$cookieStore', '$rootScope'];

    function membershipService(apiService, notificationService, $http, $base64, $cookieStore, $rootScope) {

        var service = {
            login: login,
            passthrough: passthrough,
            register: register,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn
        }

        function login(user, completed) {
            apiService.get('/api/auth/login?username=' + user.username + "&password=" + user.password, user, completed, loginFailed);
        }

        function passthrough(uid, completed) {
            apiService.get('/api/auth/Passthrough?uid=' + uid, '', completed, passthroughFailed);
        }

        function register(user, completedCallback) {
            apiService.post('/api/auth/register', user, completedCallback, registrationFailed);
        }

        function saveCredentials(user, response) {
            var token = response.data.meta.token;
            var nonce = response.data.meta.nonce;
            var ck = response.data.meta.cookie;

            $rootScope.repository = {
                loggedUser: {
                    username: response.data.data[0].authResult.user.u_logon_name,
                    email: response.data.data[0].authResult.user.u_email_address,
                    authdata: token
                }
            };

            $http.defaults.headers.common['x-blue-token'] = token;
            $http.defaults.headers.common['x-blue-nonce'] = nonce;
            $http.defaults.headers.common['x-blue-auth'] = ck;

            $cookieStore.put('repository', ($rootScope.repository));
        }

        function removeCredentials() {
            $rootScope.repository = {};
            $cookieStore.remove('repository');
            $cookieStore.remove($rootScope.phoenix_constants.cookie_name);

            $http.defaults.headers.common.Authorization = '';
            $http.defaults.headers.common["x-blue-nonce"] = '';
            $http.defaults.headers.common["x-blue-token"] = '';
            $http.defaults.headers.common["x-blue-auth"] = '';
        };

        function loginFailed(result) {
            var r = result.meta;
            notificationService.displayError(r.message);
        }

        function passthroughFailed(result) {
            var r = result.data.data[0] || result.data.data;
            notificationService.displayError(r.message);
        }

        function registrationFailed(result) {
            var r = result.meta;
            notificationService.displayError('Registration failed. Try again. ' + r.message);
        }

        function isUserLoggedIn() {
            return $rootScope.repository.loggedUser != null;
        }

        return service;
    }



})(angular.module('common.core'));