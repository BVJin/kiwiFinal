'use strict';

/**
 * @ngdoc overview
 * @name yiliApp
 * @description
 * # yiliApp
 *
 * Main module of the application.
 */
angular
  .module('yiliApp', [
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/Daily-News-Cover', {
        templateUrl: 'views/Daily-News-Cover.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
