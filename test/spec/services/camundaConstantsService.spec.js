'use strict';

describe('Service: camundaConstantsService', function () {

  // load the service's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate service
  var camundaConstantsService;

  // inject services
  beforeEach(inject(function (_camundaConstantsService_) {
    camundaConstantsService = _camundaConstantsService_;
  }));

  it('should provide base url', function () {
    expect(!!camundaConstantsService.baseUrl).toBe(true);
  });

});
