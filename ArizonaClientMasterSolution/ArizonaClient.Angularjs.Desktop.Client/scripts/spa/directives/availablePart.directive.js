(function (app) {
	'use strict';

	app.directive('availablePart', availablePart);

	function availablePart() {
		return {
			restrict: 'E',
			templateUrl: "/scripts/spa/directives/availablePart.html",
			link: function ($scope, $element, $attrs) {
				$scope.getAvailableClass = function () {
				    if ($attrs.status === 1 || $attrs.status === 2)
				        return 'label label-success';
				    else
				        return 'label label-danger';
				};
				$scope.getAvailability = function () {
				    if ($attrs.status === 1 || $attrs.status === 2 )
				        return 'Available!';
				    else
				        return 'Not Available';
				};
			}
		}
	}

})(angular.module('common.ui'));