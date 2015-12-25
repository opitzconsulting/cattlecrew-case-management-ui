'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaCaseService
 * @description
 * # camundaCaseService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaCaseService', function ($http, camundaConstantsService) {
    //
    // local namespace
    //
    var srv = {};

    srv._baseUrl = camundaConstantsService.baseUrl;

    //
    // Service logic
    //
    srv.getCases = function() {
      return $http.get(
        srv._baseUrl + '/case-instance'
      );
    };

    srv.getCaseById = function(caseId) {
      return $http.get(
        srv._baseUrl + '/case-instance/' + caseId
      );
    };

    srv.getCaseDefinitions = function() {
      return $http.get(
        srv._baseUrl + '/case-definition'
      );
    };

    srv.getCaseDefinitionById = function(caseDefinitionId) {
      return $http.get(
        srv._baseUrl + '/case-definition/' + caseDefinitionId
      );
    };

    //
    // Public API
    //
    return {
      getCases: function () {
        return srv.getCases();
      },
      getCaseById: function(caseId) {
        return srv.getCaseById(caseId);
      },
      getCaseDefinitions: function() {
        return srv.getCaseDefinitions();
      },
      getCaseDefinitionById: function(caseDefinitionId) {
        return srv.getCaseDefinitionById(caseDefinitionId);
      }
    };
  });
