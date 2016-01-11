'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('DashboardCtrl', function($scope, caseService) {

    $scope.initView = function() {

      $scope.casesOrderCondition = {
        predicate: 'createTime',
        reverse: true
      };

      caseService.updateCaseDefinitions();
      $scope.caseDefinitionsArrayContainer = caseService.getCaseDefinitionsArrayContainer();

      caseService.updateCasesOverview();
      $scope.casesOverviewArrayContainer = caseService.getCasesOverviewArrayContainer();
      caseService.startPolling();
    };

    $scope.initView();

  });
