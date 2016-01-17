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
    srv._resourceProcessInstance =  $resource(srv._baseUrl + '/history/process-instance?superCaseInstanceId=:superCaseInstanceId', {}, {
      get: {method: 'GET', isArray: true}
    });

    srv._resourceDecisionInstance = $resource(srv._baseUrl + '/history/decision-instance?&includeInputs=true&includeOutputs=true&disableBinaryFetching=true&disableCustomObjectDeserialization=true&processInstanceId=:processInstanceId', {}, {
        get: {method: 'GET', isArray: true}
      });

    srv._resourceDecisionDefinition = $resource(srv._baseUrl + '/decision-definition/:decisionDefinitionId');

    srv._resourceProcessDefinition = $resource(srv._baseUrl + '/process-definition/:processDefinitionId');

    srv._resourceProcessActivity = $resource(srv._baseUrl + '/history/activity-instance/:activityInstanceId');

    srv.loadProcessInstances = function(caseId) {
      return srv._resourceProcessInstance.get({superCaseInstanceId: caseId}).$promise;
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
          // load process definition
          srv._resourceProcessDefinition.get({processDefinitionId: processInstance.processDefinitionId}, function(res) {
           processInstance.processDefinition = res;
          });
          // load decisions
          srv._resourceDecisionInstance.get({processInstanceId: processInstance.id}, function(result) {
            result.forEach(function(decisionInstance) {
              processInstance.decisionInstances = [];

              var decision = decisionInstance;

              // load decision definition
              srv._resourceDecisionDefinition.get({decisionDefinitionId: decision.decisionDefinitionId}, function(result3) {
                decision.decisionDefinition = {};
                decision.decisionDefinition = result3;
              });

              // load process activity
              srv._resourceProcessActivity.get({activityInstanceId: decision.activityInstanceId}, function(respActivity) {
                decision.calledByProcessActivity = {};
                decision.calledByProcessActivity = respActivity;
              });

              processInstance.decisionInstances.push(decision);
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
