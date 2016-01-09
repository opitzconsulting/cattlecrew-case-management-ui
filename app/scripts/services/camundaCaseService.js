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
    srv._cases = [
      {
        'links': [],
        'id': '1e3abaa1-a1a1-11e5-822a-e018770e74ce',
        'caseDefinitionId': 'claim:1:60a52d55-9c5c-11e5-95d7-e018770e74ce',
        'businessKey': null,
        'active': true,
        'completed': false,
        'terminated': false,
	'createTime': "2016-01-07T18:29:18",
	'closeTime' : null,
	'durationInMillis' : null,
	'createUserId' : null,
	'superCaseInstanceId' : null,
	'priority' : null,
	
      },
      {
        'links': [],
        'id': '1f5811a7-a1a1-11e5-822a-e018770e74ce',
        'caseDefinitionId': 'claim_file:1:61ba1ee0-9c5c-11e5-95d7-e018770e74ce',
        'businessKey': null,
        'active': true,
        'completed': false,
        'terminated': false
      },
      {
        'links': [],
        'id': '24a12d14-a1a0-11e5-be5b-e018770e74ce',
        'caseDefinitionId': 'claim:1:60a52d55-9c5c-11e5-95d7-e018770e74ce',
        'businessKey': null,
        'active': true,
        'completed': false,
        'terminated': false
      },
      {
        'links': [],
        'id': '25d9d44a-a1a0-11e5-be5b-e018770e74ce',
        'caseDefinitionId': 'claim_file:1:61ba1ee0-9c5c-11e5-95d7-e018770e74ce',
        'businessKey': null,
        'active': true,
        'completed': false,
        'terminated': false
      },
      {
        'links': [],
        'id': '81d0ea85-9d13-11e5-880f-e018770e74ce',
        'caseDefinitionId': 'claim:1:60a52d55-9c5c-11e5-95d7-e018770e74ce',
        'businessKey': null,
        'active': true,
        'completed': false,
        'terminated': false
      },
      {
        'links': [],
        'id': '8330efdb-9d13-11e5-880f-e018770e74ce',
        'caseDefinitionId': 'claim_file:1:61ba1ee0-9c5c-11e5-95d7-e018770e74ce',
        'businessKey': null,
        'active': true,
        'completed': false,
        'terminated': false
      }
    ];

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
