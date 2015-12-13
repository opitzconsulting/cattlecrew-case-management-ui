'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:CasedetailsCtrl
 * @description
 * # CasedetailsCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('CaseDetailsCtrl',
  function ($scope, $location, $routeParams, camundaCaseService) {
    var caseId = $routeParams.caseId;
    $scope.case = camundaCaseService.getCaseById(caseId);

    $scope.goToListView = function() {
      $location.path('/');
    };

  });
