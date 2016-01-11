'use strict';

describe('Service: camundaCaseService', function () {

  // load the application module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate services
  var camundaCaseService;
  var $httpBackend;

  // inject services
  beforeEach(inject(function (_camundaCaseService_, _$httpBackend_) {
    camundaCaseService = _camundaCaseService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!camundaCaseService).toBe(true);
  });

});
