'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaCaseService
 * @description
 * # camundaCaseService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaCaseService', function () {
    //
    // local namespace
    //
    var srv = {};

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
      // Copy the array in order not to expose
      // the internal data structure
      return angular.copy(srv._cases);
    };

    srv.getCaseById = function(id) {
      for (var i = 0, n = srv._cases.length; i < n; i++) {
        if (id === srv._cases[i].id) {
          return angular.copy(srv._cases[i]);
        }
      }

      return null;
    };

    //
    // Public API
    //
    return {
      getCases: function () {
        return srv.getCases();
      },
      getCaseById: function(id) {
        return srv.getCaseById(id);
      }
    };
  });
