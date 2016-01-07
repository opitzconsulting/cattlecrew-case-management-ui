'use strict';

describe('Service: camundaCaseService', function () {

  // just to match the baseUrl in the service
  var baseUrl = 'http://localhost:8080/engine-rest';

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

  it('should detect the service ', function () {
    expect(!!camundaCaseService).toBe(true);
  });

  it('should include a getCases() function', function () {
    expect(camundaCaseService.getCases).toBeDefined();
  });

  it('should include a getCaseById() function', function () {
    expect(camundaCaseService.getCaseById).toBeDefined();
  });

  it('should include a getCaseDefinitions() function', function () {
    expect(camundaCaseService.getCaseDefinitions).toBeDefined();
  });

  it('should include a getCaseDefinitionById() function', function () {
    expect(camundaCaseService.getCaseDefinitionById).toBeDefined();
  });

  describe('Public API usage', function () {

    describe('getCases()', function () {
      it('should return a proper array of case objects',
        function () {
          $httpBackend.expectGET(baseUrl + '/case-instance'
          ).respond(respondedCases);

          camundaCaseService.getCases().then(function (result) {
            var resultedCases = result.data;
            expect(resultedCases.length).toBe(2);
          });
          $httpBackend.flush();
        });
    });

    describe('getCaseById()', function () {
      it('should return the proper case object (valid id)',
        function () {
          var caseId = 'caseId_1';
          $httpBackend.expectGET(baseUrl + '/case-instance/' + caseId
          ).respond(respondedCases[0]);

          camundaCaseService.getCaseById(caseId).then(function (result) {
            var resultedCase = result.data;
            expect(resultedCase.caseDefinitionId).toBe('caseDefinitionId_1');
          });
          $httpBackend.flush();
        });

      it('should return invalid case id response (invalid id)',
        function () {
          var caseId = 'test';
          $httpBackend.expectGET(baseUrl + '/case-instance/' + caseId
          ).respond(invalidResponse);

          camundaCaseService.getCaseById(caseId).then(function (result) {
            var resultedCase = result.data;
            expect(resultedCase).toEqual(invalidResponse);
          });
          $httpBackend.flush();
        });
    });

    describe('getCaseDefinitions()', function () {
      it('should return a proper array of case definition objects',
        function () {
          $httpBackend.expectGET(baseUrl + '/case-definition'
          ).respond(respondedCaseDefinitions);

          camundaCaseService.getCaseDefinitions().then(function (result) {
            var resultedCaseDefinitions = result.data;
            expect(resultedCaseDefinitions.length).toBe(2);
          });
          $httpBackend.flush();
        });
    });

    describe('getCaseDefinitionById()', function () {
      it('should return the proper case definition object (valid id)',
        function () {
          var caseDefinitionId = 'caseDefinitionId_1';
          $httpBackend.expectGET(baseUrl + '/case-definition/' + caseDefinitionId
          ).respond(respondedCaseDefinitions[0]);

          camundaCaseService.getCaseDefinitionById(caseDefinitionId).then(function (result) {
            var resultedCaseDefinition = result.data;
            expect(resultedCaseDefinition.key).toBe('claim_file');
          });
          $httpBackend.flush();
        });

      it('should return invalid case definition id response (invalid id)',
        function () {
          var caseDefinitionId = 'test';
          $httpBackend.expectGET(baseUrl + '/case-definition/' + caseDefinitionId
          ).respond(invalidResponse);

          camundaCaseService.getCaseDefinitionById(caseDefinitionId).then(function (result) {
            var resultedCaseDefinition = result.data;
            expect(resultedCaseDefinition).toEqual(invalidResponse);
          });
          $httpBackend.flush();
        });
    });

  });

  // Helper objects
  var respondedCases = [
    {
      'links': [],
      'id': 'caseId_1',
      'caseDefinitionId': 'caseDefinitionId_1',
      'businessKey': null,
      'active': true,
      'completed': false,
      'terminated': false
    },
    {
      'links': [],
      'id': 'caseId_2',
      'caseDefinitionId': 'caseDefinitionId_2',
      'businessKey': null,
      'active': true,
      'completed': false,
      'terminated': false
    }
  ];

  var respondedCaseDefinitions = [
    {
      'id': 'caseDefinitionId_1',
      'key': 'claim_file',
      'category': 'http://cmmn.org',
      'name': null,
      'version': 1,
      'resource': 'claim-file.cmmn10.xml',
      'deploymentId': 'deploymentId_1'
    },
    {
      'id': 'caseDefinitionId_2',
      'key': 'claim',
      'category': 'http://cmmn.org',
      'name': null,
      'version': 1,
      'resource': 'claim.cmmn10.xml',
      'deploymentId': 'deploymentId_2'
    }
  ];

  var invalidResponse = {
    'type': 'InvalidRequestException',
    'message': 'Case instance with id test does not exist.'
  };

});
