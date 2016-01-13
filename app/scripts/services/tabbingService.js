'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.tabbingService
 * @description
 * # tabbingService
 * Factory in the cattlecrewCaseManagementUiApp.
 *
 * TODO refactor to local namespace
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('tabbingService', function(caseService) {

        var tabTemplate = {
            master: null, //reference to Parent Object in Cache
            detail: null //reference to detail Object in Cache (can be parent or child)
        };

        var tabs = {};

        var getDetailCaseByParentCaseId = function(caseId){
            if (tabs[caseId]){
                if(tabs[caseId].detail !== null){
                    return tabs[caseId].detail;
                }
                //if no details yet then master == details.
                tabs[caseId].detail = tabs[caseId].master;
                return tabs[caseId].detail;
            }
        };

        var setMasterAsDetailByParentCaseId = function(caseId){
            if(tabs[caseId]){
                tabs[caseId].detail = tabs[caseId].master;
            }
        };

        var setDetailByCaseId = function(parentCaseId, childCaseId){
            if(tabs[parentCaseId]){
                tabs[parentCaseId].detail = caseService.getCase(childCaseId);
            }
        };

        var createNewTabByParentCaseId = function(caseId){
            tabs[caseId] = angular.copy(tabTemplate);
            //var tmp = caseService.getCase(caseId);
            tabs[caseId].master = caseService.getCase(caseId);
            return tabs[caseId].master;
        };

        return {
            getDetailCaseByParentCaseId:getDetailCaseByParentCaseId,
            setMasterAsDetailByParentCaseId:setMasterAsDetailByParentCaseId,
            setDetailByCaseId:setDetailByCaseId,
            createNewTabByParentCaseId:createNewTabByParentCaseId
        };
  });
