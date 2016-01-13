'use strict';

/**
 * @ngdoc overview
 * @name cattlecrewCaseManagementUiApp
 * @description
 * # cattlecrewCaseManagementUiApp
 *
 * Main module of the application.
 */
angular
  .module('cattlecrewCaseManagementUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/newcase', {
        templateUrl: 'views/newcase.html',
        controller: 'NewCaseCtrl',
        controllerAs: 'newcase'
      })
      .when('/casedetails/:caseId', {
        //templateUrl: 'views/details.html',
        templateUrl: 'views/casedetails.html',
        controller: 'CaseDetailsCtrl',
        controllerAs: 'casedetails'
      })
      .when('/cmmn', {
        templateUrl: 'views/cmmn.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
