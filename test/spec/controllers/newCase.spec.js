'use strict';

describe('Controller: NewCaseCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var NewCaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCaseCtrl = $controller('NewCaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
