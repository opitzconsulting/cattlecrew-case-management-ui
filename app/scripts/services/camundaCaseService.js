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

    //
    // Service logic
    //
    srv.getCases = function() {
      return $http.get(
        srv._baseUrl + '/engine-rest/case-instance'
      );
    };

    srv.getCaseById = function(id) {
      return $http.get(
        srv._baseUrl + '/engine-rest/case-instance/' + id
      );
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
