'use strict';

/**
 * @ngdoc directive
 * @name cattlecrewCaseManagementUiApp.directive:renderCaseModel
 * @description
 * # renderCaseModel
 */
angular.module('cattlecrewCaseManagementUiApp')
  .directive('renderCaseModel', function () {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'views/templates/rendercasemodel.html',
      scope: {
        caseDefinition: '@',
        highlightCaseActivityIds: '@'
      },
      link: function (scope, element, attrs) {
        angular.element(document).ready(function () {

          // observe caseDefinition
          attrs.$observe('caseDefinition', function(value) {
            if(value){
              // remove old content on reload
              angular.element(document).find('#cmmnCanvas').children().remove();
              var restAccess = 'http://localhost:8080/engine-rest';
              var CmmnViewer = window.CmmnJS; // CmmnViewer
              var viewer = new CmmnViewer({container: '#cmmnCanvas' });
              var container = angular.element(document).find('#cmmn-drop-zone');
              angular.element.get(restAccess + '/case-definition/key/' + attrs.caseDefinition + '/xml', function(data) {
                viewer.importXML(data.cmmnXml, function(err) {
                  if (err) {
                    console.log('error rendering cmmn xml', err);
                  }
                  var canvas = viewer.get('canvas');
                  // zoom to fit full viewport
                  canvas.zoom('fit-viewport');
                  container.removeClass('with-error').addClass('with-diagram');
                  // add marker
                  var highlightIds = attrs.highlightCaseActivityIds.split(';');
                  highlightIds.forEach(function(element) {
                    canvas.addMarker(element, 'highlight');
                  });
                });
              });

            }
          });

          // observe highlightCaseActivityId
          attrs.$observe('highlightCaseActivityIds', function(value){
            if(value){
              // remove old content on reload
              angular.element(document).find('#cmmnCanvas').children().remove();
              var restAccess = 'http://localhost:8080/engine-rest';
              var CmmnViewer = window.CmmnJS; // CmmnViewer
              var viewer = new CmmnViewer({container: '#cmmnCanvas' });
              var container = angular.element(document).find('#cmmn-drop-zone');
              angular.element.get(restAccess + '/case-definition/key/' + attrs.caseDefinition + '/xml', function(data) {
                viewer.importXML(data.cmmnXml, function(err) {
                  if (err) {
                    console.log('error rendering cmmn xml', err);
                  }
                  var canvas = viewer.get('canvas');
                  // zoom to fit full viewport
                  canvas.zoom('fit-viewport');
                  container.removeClass('with-error').addClass('with-diagram');
                  // add marker
                  var highlightIds = attrs.highlightCaseActivityIds.split(';');
                  highlightIds.forEach(function(element) {
                    canvas.addMarker(element, 'highlight');
                  });
                });
              });

            }
          });

        });
      }
    };
  });
