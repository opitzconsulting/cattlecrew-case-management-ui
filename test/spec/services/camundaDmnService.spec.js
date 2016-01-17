'use strict';

describe('Service: camundaDmnService', function () {

  // load the service's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate service
  var camundaDmnService;
  beforeEach(inject(function (_camundaDmnService_) {
    camundaDmnService = _camundaDmnService_;
  }));

  it('should do something', function () {
    expect(!!camundaDmnService).toBe(true);
  });

});
