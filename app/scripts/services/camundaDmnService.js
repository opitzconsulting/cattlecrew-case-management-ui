'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaDmnService
 * @description
 * # camundaDmnService
 * Service in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .service('camundaDmnService', function ($resource, $q, $timeout, camundaConstantsService, camundaCacheService) {
    //
    // local namespace
    //
    var srv = {};

    srv._baseUrl = camundaConstantsService.baseUrl;

    //
    // Service logic
    //
    srv._resourceProcessInstanceBySuperCaseInstanceId =  $resource(srv._baseUrl + '/history/process-instance?superCaseInstanceId=:superCaseInstanceId', {}, {
      get: {method: 'GET', isArray: true}
    });

    srv._resourceDecisionInstanceByProcessInstanceId = $resource(srv._baseUrl + '/history/decision-instance?includeInputs=true&includeOutputs=true&processInstanceId=:processInstanceId', {}, {
        get: {method: 'GET', isArray: true}
      });

    srv._resourceDecisionDefinitions = $resource(srv._baseUrl + '/decision-definition/:decisionDefinitionId');

    srv.loadProcessInstances = function(caseId) {
      return srv._resourceProcessInstanceBySuperCaseInstanceId.get({superCaseInstanceId: caseId}).$promise;
    };

    srv.updateDecisions = function(caseId) {
      srv.loadProcessInstances(caseId).then(function(firstResult) {
        return srv.loadDecisions(firstResult);
      }).then(function(secondResult) {
        camundaCacheService.putDecisionsInCache(secondResult, caseId);
      });
    };

    srv.loadDecisions = function(processes) {
      var promises = processes.map(function(processInstance) {
        return $q(function(resolve, reject) {
          srv._resourceDecisionInstanceByProcessInstanceId.get({processInstanceId: processInstance.id}, function(result) {
            result.forEach(function(decisionInstance) {
              processInstance.decisionInstances = [];
              processInstance.decisionInstances.push(decisionInstance);
            });
            resolve(processInstance);
          }, function(error) {
            console.log('An error occurred during function \'loadDecisions\'!', error);
            reject(processInstance);
          });
        });
      });
      return $q.all(promises);
    };

    //
    // Public API
    //
    return {
      updateDecisions: function(caseId) {
        srv.updateDecisions(caseId);
      }
    };
  });
