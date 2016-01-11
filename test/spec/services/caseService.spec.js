'use strict';

describe('Service: caseService', function () {

  // load the service's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate service
  var caseService;

  // inject services
  beforeEach(inject(function (_caseService_) {
    caseService = _caseService_;
  }));

  it('should do something', function () {
    expect(!!caseService).toBe(true);
  });

});
