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
      camundaCaseService.getCaseById(caseId).then(function (res) {
        $scope.case = res.data;
      }, function(error) {
        console.log('An error occured!', error);
      });

      $scope.goToListView = function () {
        $location.path('/');
      };

    });
