'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:NewCaseCtrl
 * @description
 * # NewCaseCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('NewCaseCtrl', function ($scope, camundaCaseDefinitionService) {
    $scope.caseDefinitions = camundaCaseDefinitionService.getCaseDefinitions();
  });
