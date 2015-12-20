'use strict';

describe('Service: camundaCaseService', function() {

  // just to match the baseUrl in the service
  var baseUrl = 'http://localhost:8080';

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

  // define trained responses
  beforeEach(function () {
    $httpBackend.when(
      'GET', baseUrl + '/engine-rest/case-instance'
    ).respond(respondedCases);

    $httpBackend.when(
      'GET', baseUrl + '/engine-rest/case-instance/1e3abaa1-a1a1-11e5-822a-e018770e74ce'
    ).respond(respondedCases[0]);

    $httpBackend.when(
      'GET', baseUrl + '/engine-rest/case-instance/test'
    ).respond(invalidCaseIdResponse);
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should detect the service ', function () {
    expect(!!camundaCaseService).toBe(true);
  });

  it('should include a getCases() function', function () {
    expect(camundaCaseService.getCases).toBeDefined();
  });

  it('should include a getCaseById() function', function () {
    expect(camundaCaseService.getCaseById).toBeDefined();
  });

  describe('Public API usage', function () {

    describe('getCases()', function () {
      it('should return a proper array of case objects',
        function () {
          $httpBackend.expectGET(
            baseUrl + '/engine-rest/case-instance'
          );

          var resultedCases;
          camundaCaseService.getCases().then(function(res) {
            resultedCases = res.data;
          });
          $httpBackend.flush();

          expect(resultedCases.length).toBe(2);
        });
    });

    describe('getCaseById', function () {
      it('should return the proper case object (valid id)',
        function () {
          var caseId = '1e3abaa1-a1a1-11e5-822a-e018770e74ce';

          $httpBackend.expectGET(
            baseUrl + '/engine-rest/case-instance/' + caseId
          );

          var resultedCase;
          camundaCaseService.getCaseById(caseId).then(function(res) {
            resultedCase = res.data;
          });
          $httpBackend.flush();

          expect(resultedCase.caseDefinitionId).toBe('claim:1:60a52d55-9c5c-11e5-95d7-e018770e74ce');
        });

      it('should return invalid case id response (invalid id)',
        function () {
          var caseId = 'test';
          $httpBackend.expectGET(
            baseUrl + '/engine-rest/case-instance/' + caseId
          );

          var resultedCase;
          camundaCaseService.getCaseById(caseId).then(function(res) {
            resultedCase = res.data;
          });
          $httpBackend.flush();

          expect(resultedCase).toEqual(invalidCaseIdResponse);
        });
    });

  });

  // Helper objects
  var respondedCases = [
    {
      'links': [],
      'id': '1e3abaa1-a1a1-11e5-822a-e018770e74ce',
      'caseDefinitionId': 'claim:1:60a52d55-9c5c-11e5-95d7-e018770e74ce',
      'businessKey': null,
      'active': true,
      'completed': false,
      'terminated': false
    },
    {
      'links': [],
      'id': '1f5811a7-a1a1-11e5-822a-e018770e74ce',
      'caseDefinitionId': 'claim_file:1:61ba1ee0-9c5c-11e5-95d7-e018770e74ce',
      'businessKey': null,
      'active': true,
      'completed': false,
      'terminated': false
    }
  ];

  var invalidCaseIdResponse = {
    "type": "InvalidRequestException",
    "message": "Case instance with id test does not exist."
  };

});
