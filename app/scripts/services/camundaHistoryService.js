
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
    srv.serverHost = '13579';
    srv.serverUrl = 'http://localhost:'+ srv.serverHost;
    srv.engineUrl = '/engine-rest/history/case-instance:caseID';
    srv.history = $resource ( srv.serverUrl + srv.engineUrl )  ;
    console.log(srv.cases);
    //
    // Service logic
    //

    srv.getHistoryById = function(id) {
	return srv.history.query().$promise;
    };

    //
    // Public API
    //
    return {
      getHistoryById: function(id) {
        return srv.getHistoryById(id);
      }
    };
  });
