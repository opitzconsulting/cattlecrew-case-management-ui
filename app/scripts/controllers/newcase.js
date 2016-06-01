'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:NewCaseCtrl
 * @description
 * # NewCaseCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('NewCaseCtrl', function ($scope, $location, caseService,  localizationService) {

    $scope.getString = function(key){
      return localizationService.getString(key);
    };

    $scope.initView = function() {
      $scope.caseDefinitionsArrayContainer = caseService.getCaseDefinitionsArrayContainer();

      if ($scope.caseDefinitionsArrayContainer.caseDefinitionList.length === 0) {
        caseService.updateCaseDefinitions();
      }

      $scope.requestData = {
        businessKey: null,
        variables: {}
      };

      $scope.variables = [];

    };

    $scope.initView();

    $scope.setSelectedCaseDefinition = function(selectedCaseDefinition) {
      $scope.selectedCaseDefinition = selectedCaseDefinition;
    };

    $scope.createCaseInstance = function(key) {
      $scope.variables.forEach(function (element){
        $scope.requestData.variables[element.key] = {
          value : element.value,
          type : element.type};
      });

      caseService.createCaseInstance(key, $scope.requestData);
    };

    $scope.goToDashboardView = function () {
      $location.path('/');
    };

    $scope.addVariable = function () {
      $scope.variables.push({
        key : null,
        value : null,
        type : null
      });
    };
  });
