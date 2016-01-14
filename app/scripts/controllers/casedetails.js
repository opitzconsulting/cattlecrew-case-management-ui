'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:CaseDetailsCtrl
 * @description
 * # CaseDetailsCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('CaseDetailsCtrl', function ($scope, $location, $routeParams, caseService, tabbingService, $window) {

    $scope.initView = function(caseId) {

      $scope.caseId = caseId;
      caseService.getEntireCase($routeParams.caseId);

      //getting case object reference from cache. it might later then be filled by the
      // case service if this hasn't happened yet
      $scope.case = tabbingService.createNewTabByParentCaseId($routeParams.caseId);
    };

    $scope.initView($routeParams.caseId);

    $scope.startActivity = function(selectedActivity) {
      console.log(selectedActivity);
      caseService.startActivity(selectedActivity.caseId, selectedActivity.definitionId);
    };

    $scope.openURL = function(url) {
      $window.open(url);
    }

    });
