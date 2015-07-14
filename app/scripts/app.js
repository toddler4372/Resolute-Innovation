'use strict';

/**
 * @ngdoc overview
 * @name riV10App
 * @description
 * # riV10App
 *
 * Main module of the application.
 */
angular
  .module('riV10App', [
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
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'searchCtrl',
        controllerAs: 'search'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'exploreCtrl',
        controllerAs: 'explore'
      })
      .when('/recommended', {
        templateUrl: 'views/recommended.html',
        controller: 'recommendedCtrl',
        controllerAs: 'recommended'
      })
      .when('/trending', {
        templateUrl: 'views/trending.html',
        controller: 'trendingCtrl',
        controllerAs: 'trending'
      })
      .when('/featured', {
        templateUrl: 'views/featured.html',
        controller: 'featuredCtrl',
        controllerAs: 'featured'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
