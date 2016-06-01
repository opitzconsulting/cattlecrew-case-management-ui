'use strict';

describe('Controller: CaseModelCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CaseModelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CaseModelCtrl = $controller('CaseModelCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
