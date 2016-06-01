'use strict';

describe('Controller: CaseRawDataCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CaseRawDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CaseRawDataCtrl = $controller('CaseRawDataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
