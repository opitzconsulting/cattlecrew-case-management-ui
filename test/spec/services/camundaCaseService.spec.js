'use strict';

describe('Service: camundaCaseService', function () {

  // load the service's module
  beforeEach(module('cattlecrewCaseManagementUiApp'));

  // instantiate service
  var camundaCaseService;
  beforeEach(inject(function (_camundaCaseService_) {
    camundaCaseService = _camundaCaseService_;
  }));

  it('should do something', function () {
    expect(!!camundaCaseService).toBe(true);
  });

  it('should include a getCases() function', function () {
    expect(camundaCaseService.getCases).toBeDefined();
  });

  it('should include a getCaseById() function', function () {
    expect(camundaCaseService.getCaseById).toBeDefined();
  });

  describe('Public API usage', function() {

    describe('getCases()', function() {
      it('should return a proper array of case objects',
      function() {
        var cases = camundaCaseService.getCases();
        expect(cases.length).toBe(6);
      });
    });

    describe('getCaseById', function() {
      it('should return the proper case object (valid id)',
      function() {
        var caseId = '1e3abaa1-a1a1-11e5-822a-e018770e74ce',
          resultedCase = camundaCaseService.getCaseById(caseId);
        expect(resultedCase.caseDefinitionId).toBe('claim:1:60a52d55-9c5c-11e5-95d7-e018770e74ce');
      });

      it('should return null (invalid id)',
      function() {
        var caseId = 'test',
          resultedCase = camundaCaseService.getCaseById(caseId);
        expect(resultedCase).toBeNull();
      });
    });

  });

});
