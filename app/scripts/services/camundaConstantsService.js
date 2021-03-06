'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaConstantsService
 * @description
 * # camundaConstantsService
 * Constant in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .constant('camundaConstantsService', {
    baseUrl : 'http://localhost:8080/engine-rest',
    serverPollingDelay : 5000
  });
