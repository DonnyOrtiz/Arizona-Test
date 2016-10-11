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
            apiService.get('/api/auth/passthrough?uid=' + uid, null, completed, passthroughFailed);
        }

        function register(user, completedCallback) {
            apiService.post('/api/auth/register', user, completedCallback, registrationFailed);
        }

        function saveCredentials(user, response) {
            console.log('save-creds:' + response.data);

            var token = response.data.meta.token;
            var nonce = response.data.meta.nonce;
            var ck = response.data.meta.cookie;

            $rootScope.repository = {
                loggedUser: {
                    username: user.username,
                    email: user.email,
                    authdata: token
                }
            };

            $http.defaults.headers.common['x-blue-token'] = token;
            $http.defaults.headers.common['x-blue-nonce'] = nonce;
            $http.defaults.headers.common['x-blue-auth'] = ck;

            $cookieStore.put('auth_repository', ($rootScope.repository));
        }

        function removeCredentials() {
            $rootScope.repository = {};
            $cookieStore.remove('auth_repository');
            $cookieStore.remove($rootScope.blueprint_constants.cookie_name);

            $http.defaults.headers.common.Authorization = '';
            $http.defaults.headers.common["x-blue-nonce"] = '';
            $http.defaults.headers.common["x-blue-token"] = '';
            $http.defaults.headers.common["x-blue-auth"] = '';
        };

        function loginFailed(response) {
            var r = result.meta;
            notificationService.displayError(r.message);
        }
        function passthroughFailed(response) {
            var r = result.data.data[0] || result.data.data;
            notificationService.displayError(r.message);
        }

        function registrationFailed(response) {
            var r = result.meta;
            notificationService.displayError('Registration failed. Try again. ' + r.message);
        }

        function isUserLoggedIn() {
            return $rootScope.repository.loggedUser != null;
        }

        return service;
    }



})(angular.module('common.core'));