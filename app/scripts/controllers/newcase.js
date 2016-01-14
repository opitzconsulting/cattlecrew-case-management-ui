'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:NewCaseCtrl
 * @description
 * # NewCaseCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('NewCaseCtrl', function ($scope, $location, caseService) {

    $scope.initView = function() {
      $scope.caseDefinitionsArrayContainer = caseService.getCaseDefinitionsArrayContainer();

      if ($scope.caseDefinitionsArrayContainer.caseDefinitionList.length === 0) {
        caseService.updateCaseDefinitions();
      }

      $scope.requestData = {
        businessKey: null,
        variables: {
          priority: {
            value: null,
            type: 'String'
          }
        }
      };

    };

    $scope.initView();

    $scope.setSelectedCaseDefinition = function(selectedCaseDefinition) {
      $scope.selectedCaseDefinition = selectedCaseDefinition;
    };

    $scope.createCaseInstance = function(key) {
      console.log($scope.requestData.variables);
      if($scope.requestData.variables['priority'].value === null){
        delete $scope.requestData.variables['priority'];
        console.log($scope.requestData.variables);
      }
      caseService.createCaseInstance(key, $scope.requestData);
    };

    $scope.goToDashboardView = function () {
      $location.path('/');
    };

  });
