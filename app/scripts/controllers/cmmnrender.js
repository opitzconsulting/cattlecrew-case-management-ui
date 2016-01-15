'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:CmmnCtrl
 * @description
 * # CmmnCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('CmmnRenderCtrl', function ($scope, $location, $routeParams, caseService, tabbingService) {

    $scope.initView = function(caseId) {

      $scope.caseId = caseId;
      caseService.getEntireCase($routeParams.caseId);

      //getting case object reference from cache. it might later then be filled by the
      // case service if this hasn't happened yet
      $scope.case = tabbingService.createNewTabByParentCaseId($routeParams.caseId);
    };

    $scope.initView($routeParams.caseId);

  });
