'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaActivityService
 * @description
 * # camundaActivityService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaActivityService', function ( $resource, camundaConstantsService) {
    //
    // local namespace
    //
    var srv = {};
    srv._baseUrl = camundaConstantsService.baseUrl;
    srv.enabledActivitiesUrl = '/history/case-activity-instance?enabled=true&caseInstanceId=';
    srv.allActivitiesUrl = '/history/case-activity-instance?caseInstanceId=';
    srv.startActivityUrl = '/case-execution/:activityID/manual-start';
    srv.activity = $resource( srv._baseUrl + '/case-execution/:activityID/manual-start', {}, {
            activate: {method: 'POST', isArray: true}
        });

    srv._availabeActivities = [
	{
		'id':'2e89d49f-b564-11e5-a83c-fecc75749441',
		'parentCaseActivityInstanceId':'2e884df6-b564-11e5-a83c-fecc75749441',
		'caseActivityId':'PI_HT_changeResponsibilities',
		'caseActivityName':'Change Responsibilities',
		'caseActivityType':'humanTask',
		'caseDefinitionId':'claim_file:1:28dad2fd-497c-11e5-91ed-90489a0a0197',
		'caseInstanceId':'2e884df6-b564-11e5-a83c-fecc75749441',
		'caseExecutionId':'2e89d49f-b564-11e5-a83c-fecc75749441',
		'taskId':null,
		'calledProcessInstanceId':null,
		'calledCaseInstanceId':null,
		'createTime':'2016-01-07T18:29:18',
		'endTime':null,
		'durationInMillis':null,
		'available':false,
		'enabled':true,
		'disabled':false,
		'active':false,
		'completed':false,
		'terminated':false
	},
	{
		'id':'2e89d4a1-b564-11e5-a83c-fecc75749441',
		'parentCaseActivityInstanceId':'2e884df6-b564-11e5-a83c-fecc75749441',
		'caseActivityId':'PI_PT_createLetter',
		'caseActivityName':'Create Letter',
		'caseActivityType':'processTask',
		'caseDefinitionId':'claim_file:1:28dad2fd-497c-11e5-91ed-90489a0a0197',
		'caseInstanceId':'2e884df6-b564-11e5-a83c-fecc75749441',
		'caseExecutionId':'2e89d4a1-b564-11e5-a83c-fecc75749441',
		'taskId':null,
		'calledProcessInstanceId':null,
		'calledCaseInstanceId':null,
		'createTime':'2016-01-07T18:29:18',
		'endTime':null,
		'durationInMillis':null,
		'available':false,
		'enabled':true,
		'disabled':false,
		'active':false,
		'completed':false,
		'terminated':false
	}
 	];

    //
    // Service logic
    //

    srv.getEnabledActivities = function(caseId) {
      srv.query = srv._baseUrl + srv.enabledActivitiesUrl + caseId;
      console.log(srv.query);
      srv.history = $resource ( srv.query);
      return srv.history.query(caseId).$promise;
    };

    srv.startActivity = function ( activityId) {
    	srv.activity.activate({activityID: activityId}, {}, function(result) {
    		console.log(result);
    	}, function(error) {
    		console.log(error);
        });
    };

    srv.getAllActivities = function (caseId) {
      srv.query = srv._baseUrl + srv.allActivitiesUrl + caseId;
      console.log(srv.query);
      srv.history = $resource ( srv.query);
      return srv.history.query(caseId).$promise;
    };

    // Public API
    //
    return {
      getAllActivities: function (caseId) {
	return srv.getAllActivities(caseId);
     },
      getEnabledActivities: function (caseId) {
        return srv.getEnabledActivities(caseId);
      },
      startActivity: function (activityId) {
        return srv.startActivity(activityId);
      }
    };
  });
