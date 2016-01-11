'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.utilService
 * @description
 * # utilService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('utilService', function () {
    //
    // local namespace
    //
    var srv = {};

    /*
     * Returns a value like 3d for 3 days or 10m for 10 minutes to show how long ago something happened from now
     * (or other date).
     */
    srv.calcSmallestTimeElementDifference = function(earlier, now) {
      var diff = now - earlier;
      if (diff < 0) {
        return 'Date from the future';
      }
      diff = diff / 1000; // diff = diff in Sekunden
      if (diff < 60) {
        var sec = Math.floor(diff);
        //return (sec + ' ' + localeService.getStrings().seconds);
        return (sec + ' ' + 'Sekunden');
      }
      diff = diff / 60; // diff = diff in Minuten
      if (diff < 60) {
        var min = Math.floor(diff);
        //return (min + ' ' + localeService.getStrings().minutes);
        return (min + ' ' + 'Minuten');
      }
      diff = diff / 60;  // diff = diff in Stunden
      if (diff < 24) {
        var h = Math.floor(diff);
        //return (h + ' ' + localeService.getStrings().hours);
        return (h + ' ' + 'Stunden');
      }
      diff = diff / 24;  // diff = diff in Tagen
      //return Math.floor(diff) + ' ' + localeService.getStrings().days;
      return Math.floor(diff) + ' ' + 'Tage';
    };

    //
    // Public API
    //
    return {
      calcSmallestTimeElementDifference: function (earlier, now) {
        return srv.calcSmallestTimeElementDifference(earlier, now);
      }
    };
  });
