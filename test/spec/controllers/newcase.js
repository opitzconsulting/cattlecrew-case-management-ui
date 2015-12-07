'use strict';

describe('Controller: NewcaseCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var NewcaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewcaseCtrl = $controller('NewcaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewcaseCtrl.awesomeThings.length).toBe(3);
  });
});
