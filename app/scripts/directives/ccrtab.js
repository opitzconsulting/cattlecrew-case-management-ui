'use strict';

/**
 * @ngdoc function
 * @name cattlecrewCaseManagementUiApp.directices:ccrtab
 * @description
 * # ccrtab
 * Directive of the cattlecrewCaseManagementUiApp
 */
angular.module('cattlecrewCaseManagementUiApp')
  .directive('ccrtab', function() {

  /* jshint ignore:start */
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
    }
  };
  /* jshint ignore:end */

});
