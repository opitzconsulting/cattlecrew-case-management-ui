'use strict';

/**
 * @ngdoc directive
 * @name cattlecrewCaseManagementUiApp.directive:renderCmmn
 * @description
 * # renderCmmn
 */
angular.module('cattlecrewCaseManagementUiApp')
  .directive('renderCmmn', function () {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'views/template_rendercmmn.html',
      scope: { caseDefinition: '@',
        highlightCaseActivityId: '@'
      },
      link: function (scope, elem, attrs) {
        angular.element(document).ready(function () {

          // observe caseDefinition
          attrs.$observe('caseDefinition', function(value) {
            if(value){
              angular.element(document).find('#cmmnCanvas').children().remove(); // remove old content on reload-->
              // $('#cmmnCanvas').children().remove(); // remove old content on reload-->
              var restAccess = 'http://localhost:8080/engine-rest';
              var CmmnViewer = window.CmmnJS; // CmmnViewer
              var viewer = new CmmnViewer({container: '#cmmnCanvas' });
              var container = angular.element(document).find('#cmmn-drop-zone');
              // var container = $('#cmmn-drop-zone');
              // $.get(restAccess + '/case-definition/key/' + attrs.caseDefinition + '/xml', function(data) {
              angular.element.get(restAccess + '/case-definition/key/' + attrs.caseDefinition + '/xml', function(data) {
                viewer.importXML(data.cmmnXml, function(err) {
                  if (err) {
                    console.log('error rendering cmmn xml', err);
                    // // clear div
                    // // $("#cmmnCanvas").empty();
                    // //dynamically add an image and set its attribute
                    // var img=document.createElement("img");
                    // img.src="http://localhost:8080/engine-rest/case-definition/key/" + attrs['caseDefinition'] + "/diagram";
                    // img.alt="Case diagram";
                    // var cmmnCanvas = document.getElementById("cmmnCanvas");
                    // cmmnCanvas.appendChild(img);
                  }
                  console.log('rendered');
                  var canvas = viewer.get('canvas');
                  // zoom to fit full viewport
                  canvas.zoom('fit-viewport');
                  container.removeClass('with-error').addClass('with-diagram');
                  // add marker
                  // canvas.addMarker(attrs['highlightCaseActivityIds'], 'highlight');
                  // var highlightIds = [];
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
              // $('#cmmnCanvas').children().remove(); // remove old content on reload-->
              angular.element(document).find('#cmmnCanvas').children().remove(); // remove old content on reload-->
              var restAccess = 'http://localhost:8080/engine-rest';
              var CmmnViewer = window.CmmnJS; // CmmnViewer
              var viewer = new CmmnViewer({container: '#cmmnCanvas' });
              // var container = $('#cmmn-drop-zone');
              var container = angular.element(document).find('#cmmn-drop-zone');
              // $.get(restAccess + '/case-definition/key/' + attrs.caseDefinition + '/xml', function(data) {
              angular.element.get(restAccess + '/case-definition/key/' + attrs.caseDefinition + '/xml', function(data) {
                viewer.importXML(data.cmmnXml, function(err) {
                  if (err) {
                    console.log('error rendering cmmn xml', err);
                    // // clear div
                    // // $("#cmmnCanvas").empty();
                    // //dynamically add an image and set its attribute
                    // var img=document.createElement("img");
                    // img.src="http://localhost:8080/engine-rest/case-definition/key/" + attrs['caseDefinition'] + "/diagram";
                    // img.alt="Case diagram";
                    // var cmmnCanvas = document.getElementById("cmmnCanvas");
                    // cmmnCanvas.appendChild(img);
                  }
                  console.log('rendered');
                  var canvas = viewer.get('canvas');
                  // zoom to fit full viewport
                  canvas.zoom('fit-viewport');
                  container.removeClass('with-error').addClass('with-diagram');
                  // add marker
                  // canvas.addMarker(attrs['highlightCaseActivityIds'], 'highlight');
                  // var highlightIds = [];
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
