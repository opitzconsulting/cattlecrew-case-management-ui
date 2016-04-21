'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('DashboardCtrl', function($scope, $locale, caseService, localizationService) {


    $scope.setLocale = function(id){
	    $locale.id = id;
    }

    $scope.getString = function(key){
    	return localizationService.getString(key);
    };

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
