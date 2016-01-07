'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaCaseService
 * @description
 * # camundaCaseService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaCaseDefinitionService', function () {
    //
    // local namespace
    //
    var srv = {};

    srv._caseDefinitions = [
      {
        "id":"claim:1:10f4c0cc-a58f-11e5-b169-024243fa4415",
        "key":"claim",
        "category":"http://cmmn.org",
        "name":null,
        "version":1,
        "resource":"claim.cmmn10.xml",
        "deploymentId":"10be6e72-a58f-11e5-b169-024243fa4415"
      },
      {
        "id":"claim_file:1:10f4c0cb-a58f-11e5-b169-024243fa4415",
        "key":"claim_file",
        "category":"http://cmmn.org",
        "name":null,
        "version":1,
        "resource":"claim-file.cmmn10.xml",
        "deploymentId":"10be6e72-a58f-11e5-b169-024243fa4415"
      }
    ];

    //
    // Service logic
    //

    srv.getCaseDefinitions = function() {
      // Copy the array in order not to expose
      // the internal data structure
      return angular.copy(srv._caseDefinitions);
    };

    //
    // Public API
    //
    return {
      getCaseDefinitions: function () {
        return srv.getCaseDefinitions();
      }
    };
  });
