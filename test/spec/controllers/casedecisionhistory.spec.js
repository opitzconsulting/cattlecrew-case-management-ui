'use strict';

describe('Controller: CaseDecisionHistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CaseDecisionHistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CaseDecisionHistoryCtrl = $controller('CaseDecisionHistoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
