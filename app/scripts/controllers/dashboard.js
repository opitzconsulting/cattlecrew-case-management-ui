'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .controller('DashboardCtrl', function ($scope, camundaCaseService) {

    camundaCaseService.getCases().then(function (res) {
      $scope.cases = res.data;
    }, function(error) {
      console.log('An error occured!', error);
    });


  });
