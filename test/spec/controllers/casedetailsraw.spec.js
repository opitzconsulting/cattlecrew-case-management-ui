'use strict';

describe('Controller: CasedetailsrawCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CasedetailsrawCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CasedetailsrawCtrl = $controller('CasedetailsrawCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
