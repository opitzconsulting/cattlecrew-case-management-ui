'use strict';

describe('Service: camundaCacheService', function () {

  // load the service's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate service
  var camundaCacheService;

  // inject services
  beforeEach(inject(function (_camundaCacheService_) {
    camundaCacheService = _camundaCacheService_;
  }));

  it('should do something', function () {
    expect(!!camundaCacheService).toBe(true);
  });

});
