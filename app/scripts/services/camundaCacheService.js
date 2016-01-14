'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaCacheService
 * @description
 * # camundaCacheService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaCacheService', function () {
    //
    // local namespace
    //
    var srv = {};

    //
    // object structure
    //
    srv._casesOverviewArrayContainer = {
      casesList : []
    };

    srv._caseDefinitionsArrayContainer = {
      caseDefinitionList: []
    };

    srv._cases = {};

    srv._caseTemplate = {
      valid: true,
      data: {
        details: null,
        milestones: null,
        activities: null,
        children: [],
        parent: [],
        auditTrail: [],
        comments: null,
        documents: [
          {
            documentName: 'claimfile.pdf'
          },
          {
            documentName: 'casedocument.pdf'
          }
        ]
      }
    };

    /**
     * Service logic
     */
    srv.getCasesOverviewArrayContainer = function() {
      return srv._casesOverviewArrayContainer;
    };

    srv.getCase = function(caseId) {
      if(!srv._cases[caseId]){
        srv.initCaseInCache(caseId);
      }
      if(srv.isValid(caseId)){
        return srv._cases[caseId];
      }
    };

    //clears case if invalid or pushes new case into cache if wasn't present yet
    srv.initCaseInCache = function(caseId) {
      if(!srv._cases[caseId] || !srv._cases[caseId].valid){
        srv._cases[caseId] = angular.copy(srv._caseTemplate);
      }
    };

    srv.isValid = function(caseId) {
      if(srv._cases[caseId]){
        return srv._cases[caseId].valid;
      } else {
        return false;
      }
    };

    srv.putValuesInCache = function(caseInstances) {
      srv._casesOverviewArrayContainer.casesList = [];

      caseInstances.forEach(function(element) {
        srv._casesOverviewArrayContainer.casesList.push(srv.createDetailsObject(element));
      });
    };

    srv.putMilestonesForCase = function(milestonesFromRest, caseId) {
      srv.initCaseInCache(caseId);

      var milestones = [];

      milestonesFromRest.forEach(function(element) {
        milestones.push({
          state: element.completed ? 'ATTAINED' : 'NOT_ATTAINED',
          objectDisplayName: element.caseActivityName
        });
      });

      srv._cases[caseId].data.milestones = milestones;
    };

    srv.putChildrenForCase = function(children, caseId) {
      srv.initCaseInCache(caseId);

      srv._cases[caseId].data.children = [];

      children.forEach(function(child) {
        child.businessKey = child.caseActivityName;
        srv._cases[caseId].data.children.push(srv.createDetailsObject(child));
      });
    };

    srv.putParentForCase = function(parent, caseId) {
      srv.initCaseInCache(caseId);
      parent.businessKey = parent.caseActivityName;
      srv._cases[caseId].data.parent = srv.createDetailsObject(parent);
    };

    srv.putActivitiesForCase = function(activitiesFromRest, caseId) {
      srv.initCaseInCache(caseId);

      var activities = [];

      activitiesFromRest.forEach(function(activity) {
        var name = activity.caseActivityName;
        activities.push({
          displayName: name,
          caseId: activity.caseInstanceId,
          definitionId: activity.id,
          isRepeatable: false,
          isRequired: false
        });
      });

      srv._cases[caseId].data.activities = activities;
    };

    srv.putDetailsInformationForCase = function(details) {
      srv.initCaseInCache(details.id);

      srv._cases[details.id].data.details = srv.createDetailsObject(details);
    };

    srv.clearAuditTrail = function(caseId) {
      srv.initCaseInCache(caseId);
      srv._cases[caseId].data.auditTrail = [];
    };

    srv.putAuditInformationForCase = function(audits, caseId) {
      srv.initCaseInCache(caseId);

      audits.forEach(function(element) {
        var objectDisplayName = element.completed ? 'Activity completed: ' : 'Activity started: ';

        srv._cases[caseId].data.auditTrail.push({
          objectDisplayName: objectDisplayName + element.caseActivityName,
          type: 'ACTIVITY_EVENT',
          updatedBy: 'John Doe',
          updatedDate: new Date(element.createTime),
          updatedDateAsString: srv.formatIsoDateString(element.createTime)
        });
      });
    };

    srv.putMilestoneAuditInformationForCase = function(milestoneEvents, caseId) {
      srv.initCaseInCache(caseId);

      milestoneEvents.forEach(function(event) {
        srv._cases[caseId].data.auditTrail.push(srv.createMilestoneEvent('Milestone created: ' + event.caseActivityName, event.createTime));
      });

      milestoneEvents.filter(srv.isCompleted).forEach(function(event) {
        srv._cases[caseId].data.auditTrail.push(srv.createMilestoneEvent('Milestone completed: ' + event.caseActivityName, event.endTime));
      });
    };

    srv.createMilestoneEvent = function(objectDisplayName, time) {
      return  {
        objectDisplayName: objectDisplayName,
        type: 'MILESTONE_EVENT',
        updatedBy: 'John Doe',
        updatedDate: new Date(time),
        updatedDateAsString: srv.formatIsoDateString(time)
      };
    };

    srv.isCompleted = function(event) {
      return event.completed;
    };

    srv.createDetailsObject = function(element) {
      var caseDefinitionIdElements = element.caseDefinitionId.split(':');
      var caseDefinition = caseDefinitionIdElements.slice(0, -2).join(':');

      var state;
      if(element.active) {
        state = 'Aktiv';
      }
      if(element.completed) {
        state = 'Abgeschlossen';
      }
      if(element.terminated) {
        state = 'Abgebrochen';
      }
      if(element.closed) {
        state = 'Gesperrt';
      }

      return {
        // original attributes
        id: element.id,
        businessKey: element.businessKey,
        caseDefinitionId: element.caseDefinitionId,
        createTime: new Date(element.createTime),
        closeTime: new Date(element.closeTime),
        durationInMillis: element.durationInMillis,
        createUserId: element.createUserId,
        superCaseInstanceId: element.superCaseInstanceId,
        superProcessInstanceId: element.superProcessInstanceId,
        active: element.active,
        completed: element.completed,
        terminated: element.terminated,
        closed: element.closed,

        // custom attributes
        caseDefinition: caseDefinition,
        state: state,
        createDateAsString: srv.formatIsoDateString(element.createTime),
        createByAsString:  srv.getUserById(element.createUserId),
        lastEditedString: element.lastEditedString, // TODO impl remove if updateXXX is set and lastEditedString is passed
        updateTime: null, // TODO impl
        updateDateAsString: null, // TODO impl
        updateByAsString: null, // TODO impl
        priority: null // TODO impl, set as process variable
      };
    };

    srv.putCaseDefinitionsInCache = function(caseDefinitions) {
      srv._caseDefinitionsArrayContainer.caseDefinitionList = caseDefinitions;
    };

    srv.getCaseDefinitionsArrayContainer = function() {
      return srv._caseDefinitionsArrayContainer;
    };

    //
    // Helper methods (externalize later)
    //
    srv.formatIsoDateString = function(isoDateString) {
      var dateOptions = {
        weekday: 'short', year: 'numeric', month: 'numeric',
        day: 'numeric', hour: '2-digit', minute: '2-digit'
      };
      return new Date(isoDateString).toLocaleDateString('de-DE', dateOptions);
    };

    srv.getUserById = function(userId) {
      return userId !== null ? userId : 'John Doe'; // TODO impl fetching user by id
    };

    //
    // Public API
    //
    return {
      getCasesOverviewArrayContainer: function() {
        return srv.getCasesOverviewArrayContainer();
      },
      getCase: function(caseId) {
        return srv.getCase(caseId);
      },
      putValuesInCache: function(caseInstances) {
        srv.putValuesInCache(caseInstances);
      },
      putMilestonesForCase: function(milestonesFromRest, caseId) {
        srv.putMilestonesForCase(milestonesFromRest, caseId);
      },
      putChildrenForCase: function(children, caseId) {
        srv.putChildrenForCase(children, caseId);
      },
      putParentForCase: function(parent, caseId) {
        srv.putParentForCase(parent, caseId);
      },
      putActivitiesForCase: function(activitiesFromRest, caseId) {
        srv.putActivitiesForCase(activitiesFromRest, caseId);
      },
      putDetailsInformationForCase: function(details) {
        srv.putDetailsInformationForCase(details);
      },
      clearAuditTrail: function(caseId) {
        srv.clearAuditTrail(caseId);
      },
      putAuditInformationForCase: function(audits, caseId) {
        srv.putAuditInformationForCase(audits, caseId);
      },
      putMilestoneAuditInformationForCase: function(milestoneEvents, caseId) {
        srv.putMilestoneAuditInformationForCase(milestoneEvents, caseId);
      },
      putCaseDefinitionsInCache: function(caseDefinitions) {
        srv.putCaseDefinitionsInCache(caseDefinitions);
      },
      getCaseDefinitionsArrayContainer: function() {
        return srv.getCaseDefinitionsArrayContainer();
      }
    };
  });
