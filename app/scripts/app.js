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
        controller: 'NewcaseCtrl',
        controllerAs: 'newcase'
      })
      .when('/casedetails', {
        templateUrl: 'views/casedetails.html',
        controller: 'CasedetailsCtrl',
        controllerAs: 'casedetails'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
