'use strict';

describe('Controller: CaseDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CaseDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CaseDetailsCtrl = $controller('CaseDetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
