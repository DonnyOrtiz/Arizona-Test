(function (app) {
    'use strict';

    app.controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = ['$scope'];

    function aboutCtrl($scope) {
        $scope.pageClass = 'page-home';
    }
})(angular.module('ArizonaClientApp'));