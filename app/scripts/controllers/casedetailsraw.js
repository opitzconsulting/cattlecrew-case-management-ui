'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:CasedetailsrawCtrl
 * @description
 * # CasedetailsrawCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('CasedetailsrawCtrl', function ($scope, $location, $routeParams, caseService, tabbingService) {

    $scope.initView = function(caseId) {

      $scope.caseId = caseId;
      caseService.getEntireCase($routeParams.caseId);

      //getting case object reference from cache. it might later then be filled by the
      // case service if this hasn't happened yet
      $scope.case = tabbingService.createNewTabByParentCaseId($routeParams.caseId);
    };

    $scope.initView($routeParams.caseId);

  });
