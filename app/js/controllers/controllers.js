'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', ['ngCookies']);

appControllers.controller('MainAppCtrl',
  ['$scope', 'AuthService',
  function($scope, AuthService) {
    //check if loggedin
    AuthService.verify();

    $scope.credentials = {
      "login": '',
      "password": ''
    };

    //sign in
    $scope.signin = function ( credentials ) {
      AuthService.signin( {
        'login': credentials.login,
        'password': credentials.password
      } );
    }
    //sign out
    $scope.signout = function () {
      AuthService.signout();
    }

}]).
controller('indexCtrl',
  ['$scope',
  function( $scope ) {
    $scope.Categories = [
      { "name": "Category 1" },
      { "name": "Category 2" },
      { "name": "Category 3" },
      { "name": "Category 4" },
      { "name": "Category 5" }
    ];
}]).
controller('signupCtrl',
  ['$scope', '$location',
  function( $scope, $location ) {
    $scope.signupFailed = false;
    $scope.account = {
      "login": "",
      "password": ""
    };
    //sign up
    $scope.signup = function ( account ) {
    };

}]);
