'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('DashboardCtrl', function ($scope, camundaCaseService) {
    $scope.cases = camundaCaseService.getCases();
  });
