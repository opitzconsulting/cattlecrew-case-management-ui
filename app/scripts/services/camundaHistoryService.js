
'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.camundaHistoryService
 * @description
 * # camundaHistoryService
 * Provides history for a specific case
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('camundaHistoryService', function ($resource, $q, camundaConstantsService) {
	


    //
    // local namespace
    //
    var srv = {};

    srv._baseUrl = camundaConstantsService.baseUrl;
    srv.historyUrl = '/history/case-instance/'; 


    //
    // Service logic
    //

    srv.getHistoryById = function(caseId) {
        srv.query = srv._baseUrl + srv.historyUrl + caseId;
        console.log(srv.query);
        srv.history = $resource ( srv.query); 
	return srv.history.get(caseId).$promise;
    };

    //
    // Public API
    //
    return {
      getHistoryById: function(caseId) {
        return srv.getHistoryById(caseId);
      }
    };
  });
