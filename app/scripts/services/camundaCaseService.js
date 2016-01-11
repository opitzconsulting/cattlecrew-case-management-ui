'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaCaseService
 * @description
 * # camundaCaseService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaCaseService', function ($resource, $q, $timeout, camundaConstantsService, camundaCacheService, utilService) {
    //
    // local namespace
    //
    var srv = {};

    srv._baseUrl = camundaConstantsService.baseUrl;

    // parameters for polling data from server
    srv._serverPollingDelay = camundaConstantsService.serverPollingDelay;
    srv._pollingActive = false;
    srv._lastRequestedCaseId = undefined;

    //
    // Service logic
    //
    srv._resourceCases = $resource(srv._baseUrl + '/history/case-instance/:caseId');

    srv._resourceCaseDefinitions = $resource(srv._baseUrl + '/case-definition/:caseDefinitionId');

    srv._resourceLastAction = $resource(srv._baseUrl + '/history/user-operation?sortBy=timestamp&sortOrder=desc&maxResults=1&caseInstanceId=:caseId');

    srv._resourceCaseExecutions = $resource(srv._baseUrl + '/history/case-activity-instance?caseInstanceId=:caseId');

    srv._resourceChildren = $resource(srv._baseUrl + '/history/case-instance?superCaseInstanceId=:caseId');

    srv._resourceParent = $resource(srv._baseUrl + '/history/case-instance?subCaseInstanceId=:caseId');

    srv._resourceEnabledTasks = $resource(srv._baseUrl + '/history/case-activity-instance?enabled=true&caseActivityType=:type&caseInstanceId=:caseId');

    srv._resourceNewInstance = $resource(srv._baseUrl + '/case-definition/key/:key/create', {}, {
      create: {method: 'POST'}
    });

    srv.loadCases = function() {
      return srv._resourceCases.query().$promise;
    };

    srv.loadLastActionFor = function(cases) {
      var promises = cases.map(function(caseInstance) {
        return $q(function(resolve, reject) {
          srv._resourceLastAction.query({caseId: caseInstance.id}, function(result) {
            result.every(function(item) { // FIXME lastEditedString is only set on last item
              caseInstance.lastEditedString = utilService.calcSmallestTimeElementDifference(new Date(item.timestamp), new Date());
            });
            resolve(caseInstance);
          }, function(error) {
            console.log('An error occured during function \'loadLastActionFor\'!', error);
            reject(caseInstance);
          });
        });
      });
      return $q.all(promises);
    };

    srv.updateCasesOverview = function() {
      srv.loadCases().then(function(firstResult) {
        return srv.loadLastActionFor(firstResult);
      }).then(function(secondResult) {
        camundaCacheService.putValuesInCache(secondResult);
      });
    };

    srv.getEntireCase = function(caseId) {
      // TODO refactor to ...then(...)
      srv._resourceCaseExecutions.get({caseId: caseId}, function (caseExecutions) {
        camundaCacheService.putMilestonesForCase(caseExecutions.filter(srv.isMilestone()), caseId);
      });

      srv.loadChildren(caseId);
      srv.loadParent(caseId);

      srv.enrichWithActivities(caseId);
      srv.enrichWithDetailsInformation(caseId);

      // TODO impl
      //var promise1 = srv.enrichForAuditTrail(caseId);
      //var promise2 = srv.enrichWithMilestonesAuditInformation(caseId);
      //
      //$q.all([promise1, promise2]).then(function(result) {
      //  camundaCacheService.clearAuditTrail(caseId);
      //  camundaCacheService.putAuditInformationForCase(result[0], caseId);
      //  camundaCacheService.putMilestoneAuditInformationForCase(result[1], caseId);
      //});
    };

    srv.enrichWithActivities = function(caseId) {
      var humanTasks = srv._resourceEnabledTasks.get({caseId: caseId, type: 'humanTask'}).$promise;
      var processTasks = srv._resourceEnabledTasks.get({caseId: caseId, type: 'processTask'}).$promise;
      var caseTasks = srv._resourceEnabledTasks.get({caseId: caseId, type: 'caseTask'}).$promise;

      $q.all([humanTasks, processTasks, caseTasks]).then(function(result) {
        var activities = [];
        result.forEach(function(element) {
          Array.prototype.push.apply(activities, element);
        });

        camundaCacheService.putActivitiesForCase(activities, caseId);
      });
    };

    srv.enrichWithDetailsInformation = function(caseId) {
      srv._resourceCases.get({caseId: caseId}, function(result) {
        camundaCacheService.putDetailsInformationForCase(result, caseId);
      });
    };

    srv.isMilestone = function(execution) {
      return execution.caseActivityType === 'milestone';
    };

    srv.loadChildren = function(caseId) {
      srv._resourceChildren.get({caseId: caseId}, function(result) {
        camundaCacheService.putChildrenForCase(result, caseId);
      });
    };

    srv.loadParent = function(caseId) {
      srv._resourceParent.get({caseId: caseId}, function(result) {
        if (result.length > 0) {
          camundaCacheService.putParentForCase(result[0], caseId);
        }
      });
    };

    srv.pollDataFromServer = function() {
      if (srv._pollingActive) {
        srv.updateCasesOverview();

        if (srv._lastRequestedCaseId) {
          srv.getEntireCase(srv._lastRequestedCaseId);
        }
      }

      $timeout(srv.pollDataFromServer, srv._serverPollingDelay);
    };

    srv.startPolling = function(caseId) {
      srv._lastRequestedCaseId = caseId;
      srv._pollingActive = true;
      srv.pollDataFromServer();
    };

    srv._stopPolling = function() {
      srv._pollingActive = false;
    };

    srv.loadCaseDefinitions = function() {
      return srv._resourceCaseDefinitions.query().$promise;
    };

    srv.updateCaseDefinitions = function() {
      srv.loadCaseDefinitions().then(function(result) {
        camundaCacheService.putCaseDefinitionsInCache(result);
      });
    };

    srv.createCaseInstance = function(key, requestData) {
      srv._resourceNewInstance.create({key: key}, requestData, function(result) {
        console.log('New case instance created: ' + result);
      }, function(error) {
        console.log('Error occurred during creating a new case instance: ' + error);
      });
    };

    //
    // Public API
    //
    return {
      updateCasesOverview: function() {
        srv.updateCasesOverview();
      },
      updateCaseDefinitions: function() {
        srv.updateCaseDefinitions();
      },
      startPolling: function(caseId) {
        srv.startPolling(caseId);
      },
      stopPolling: function() {
        srv._stopPolling();
      },
      getEntireCase: function(caseId) {
        return srv.getEntireCase(caseId);
      },
      createCaseInstance: function(key, requestData) {
        srv.createCaseInstance(key, requestData);
      }
    };
  });
