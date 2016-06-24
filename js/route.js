/**
 * Created by svetlana on 17.06.2016.
 */
    'use strict';
/*var router = angular.module('router', ['ngRoute']);*/

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/first.html',
            controller: 'FirstPageController'
        })
        .when('/second', {
            templateUrl: 'partials/second.html',
            controller: 'SecondPageController'
        })
        .when('/third', {
            templateUrl: 'partials/third.html',
            controller: 'ThirdPAgeController'
        })
        .when('/fourth', {
            templateUrl: 'partials/fourth.html',
            controller: 'FourthPageController'
        })
        .when('/user-data', {
            templateUrl: 'partials/user-data.html',
            controller: 'UserDataController'
        })
        .otherwise('/');
}]);