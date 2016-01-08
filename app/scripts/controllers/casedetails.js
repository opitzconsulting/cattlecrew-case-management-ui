'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:CaseDetailsCtrl
 * @description
 * # CaseDetailsCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('CaseDetailsCtrl', function ($scope, $location, $routeParams, camundaCaseService,
				 camundaHistoryService, camundaMilestoneService, camundaActivityService) {

      var caseId = $routeParams.caseId;
      $scope.history = camundaHistoryService.getHistoryById(caseId);
      $scope.milestones = camundaMilestoneService.getMilestones(caseId);
//    $scope.activities = camundaActivityService.getActivities(caseId);
      var caseId = $routeParams.caseId;
      console.log($scope.milestones);
      camundaCaseService.getCaseById(caseId).then(function (res) {
        $scope.case = res.data;
	console.log($scope.case);
      }, function(error) {
        console.log('An error occured!', error);
      });

      $scope.goToListView = function () {
        $location.path('/');
      };

    });
