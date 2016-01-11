'use strict';

describe('Service: utilService', function () {

  // load the service's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate service
  var utilService;

  // inject services
  beforeEach(inject(function (_utilService_) {
    utilService = _utilService_;
  }));

  it('should do something', function () {
    expect(!!utilService).toBe(true);
  });

});
