'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('DashboardCtrl', function($scope, camundaCaseService) {

    $scope.initView = function() {
      $scope.casesOrderBy = {
        predicate: 'id',
        reverse: true
      };

      camundaCaseService.getCaseDefinitions().then(function(result) {
        $scope.caseDefinitions = result.data;
      }, function(error) {
        console.log('An error occured during fetching case definitions!', error);
      });

      camundaCaseService.getCases().then(function(result) {
        $scope.cases = result.data;
      }, function(error) {
        console.log('An error occured during fetching cases!', error);
      });

    };

    $scope.initView();

  });
