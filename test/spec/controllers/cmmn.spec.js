'use strict';

describe('Controller: CmmnCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CmmnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CmmnCtrl = $controller('CmmnCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
