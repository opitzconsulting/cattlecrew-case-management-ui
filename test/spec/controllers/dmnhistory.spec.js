'use strict';

describe('Controller: DmnhistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var DmnhistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DmnhistoryCtrl = $controller('DmnhistoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
