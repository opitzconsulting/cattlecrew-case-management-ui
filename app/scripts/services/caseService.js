'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.caseService
 * @description
 * # caseService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('caseService', function (camundaCaseService, camundaCacheService, camundaDmnService) {
    //
    // local namespace
    //
    var srv = {};

    srv._caseService = camundaCaseService;
    srv._cache = camundaCacheService;
    srv._dmnService = camundaDmnService;

    //
    // Service logic
    //
    srv.updateCasesOverview = function() {
      srv._caseService.updateCasesOverview();
    };

    srv.getCasesOverviewArrayContainer = function() {
      return srv._cache.getCasesOverviewArrayContainer();
    };

    srv.getEntireCase = function(entireCaseId) {
      srv._dmnService.updateDecisions(entireCaseId);
      return srv._caseService.getEntireCase(entireCaseId);
    };

    srv.getCase = function(caseId) {
      return srv._cache.getCase(caseId);
    };

    srv.startActivity = function(caseId, activityDefinitionId) {
      return srv._caseService.startActivity(caseId, activityDefinitionId);
    };

    srv.startPolling = function(caseId) {
      srv._caseService.startPolling(caseId);
    };

    srv.stopPolling = function() {
      srv._caseService.stopPolling();
    };

    srv.createCaseInstance = function(key, requestData) {
      srv._caseService.createCaseInstance(key, requestData);
    };

    srv.updateCaseDefinitions = function() {
      srv._caseService.updateCaseDefinitions();
    };

    srv.getCaseDefinitionsArrayContainer = function() {
      return srv._cache.getCaseDefinitionsArrayContainer();
    };

    //
    // Public API
    //
    return {
      updateCasesOverview: function() {
        srv.updateCasesOverview();
      },
      getCasesOverviewArrayContainer: function() {
        return srv.getCasesOverviewArrayContainer();
      },
      updateCaseDefinitions: function() {
        srv.updateCaseDefinitions();
      },
      getCaseDefinitionsArrayContainer: function() {
        return srv.getCaseDefinitionsArrayContainer();
      },
      startPolling: function(caseId) {
        srv.startPolling(caseId);
      },
      stopPolling: function() {
        srv.stopPolling();
      },
      getCase: function(caseId) {
        return srv.getCase(caseId);
      },
      getEntireCase: function(entireCaseID) {
        return srv.getEntireCase(entireCaseID);
      },
      createCaseInstance: function(key, requestData) {
        return srv.createCaseInstance(key, requestData);
      },
      startActivity: function(caseId, activityDefinitionId, startActivityComment) {
        return srv.startActivity(caseId, activityDefinitionId, startActivityComment);
      }
    };
  });
