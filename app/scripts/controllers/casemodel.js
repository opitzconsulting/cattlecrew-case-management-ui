'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:CaseModelCtrl
 * @description
 * # CaseModelCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('CaseModelCtrl', function ($scope, $location, $routeParams, caseService, tabbingService) {

    $scope.activeCaseActivityIds = function () {
      var activeCaseActivityIds = '';
      $scope.case.data.auditTrail.forEach(function (element) {
        if (element.objectDisplayName.includes('Activity started')) {
          if (activeCaseActivityIds !== '') {
            activeCaseActivityIds = activeCaseActivityIds.concat(';');
          }
          activeCaseActivityIds = activeCaseActivityIds.concat(element.caseActivityId);
        }
      });
      return activeCaseActivityIds;
    };

    $scope.initView = function(caseId) {

      $scope.caseId = caseId;
      caseService.getEntireCase($routeParams.caseId);

      //getting case object reference from cache. it might later then be filled by the
      // case service if this hasn't happened yet
      $scope.case = tabbingService.createNewTabByParentCaseId($routeParams.caseId);
    };

    $scope.initView($routeParams.caseId);

  });
