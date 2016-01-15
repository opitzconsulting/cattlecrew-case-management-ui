'use strict';

describe('Controller: CmmnRenderCtrl', function () {

  // load the controller's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  var CmmnRenderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CmmnRenderCtrl = $controller('CmmnRenderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
