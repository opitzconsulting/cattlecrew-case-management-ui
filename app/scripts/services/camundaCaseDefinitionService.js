'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaCaseService
 * @description
 * # camundaCaseService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaCaseDefinitionService', function ($resource, camundaConstantsService) {
    //
    // local namespace
    //
    var srv = {};

    srv._baseUrl = camundaConstantsService.baseUrl;
    srv.allCaseDefinitionsUrl = srv._baseUrl + '/case-definition';

    srv._caseDefinitions = [
      {
        'id':'claim:1:10f4c0cc-a58f-11e5-b169-024243fa4415',
        'key':'claim',
        'category':'http://cmmn.org',
        'name':'Forderungsmanagement-Case',
        'version':1,
        'resource':'claim.cmmn10.xml',
        'deploymentId':'10be6e72-a58f-11e5-b169-024243fa4415'
      },
      {
        'id':'claim_file:1:10f4c0cb-a58f-11e5-b169-024243fa4415',
        'key':'claim_file',
        'category':'http://cmmn.org',
        'name':'Noch ein Case',
        'version':1,
        'resource':'claim-file.cmmn10.xml',
        'deploymentId':'10be6e72-a58f-11e5-b169-024243fa4415'
      }
    ];

    //
    // Service logic
    //

    srv.getCaseDefinitions = function() {
      // Copy the array in order not to expose
      // the internal data structure
      //return angular.copy(srv._caseDefinitions);

      srv.definitions = $resource(srv.allCaseDefinitionsUrl);
      //return srv.definitions.query('GET', true).$promise;
      return srv.definitions.query('GET', true);
    };

    srv.createCaseInstanceByKey = function(caseDefinitionKey, businessKey){
      var query = srv._baseUrl + '/case-definition/key/' + caseDefinitionKey + '/create';
      var create = $resource(query);
      var body = {};
      body.businessKey = businessKey;
      return create.save(body);
    };

    //
    // Public API
    //
    return {
      getCaseDefinitions: function () {
        console.log(srv.getCaseDefinitions());
        return srv.getCaseDefinitions();
      },
      createCaseInstanceByKey: function(caseDefinitionKey, businessKey){
        var result = srv.createCaseInstanceByKey(caseDefinitionKey, businessKey);
        console.log(result);
        return result;
      }
    };
  });
