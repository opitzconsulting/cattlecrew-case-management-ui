'use strict';

describe('Controller: CasedetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CasedetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CasedetailsCtrl = $controller('CasedetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CasedetailsCtrl.awesomeThings.length).toBe(3);
  });
});
