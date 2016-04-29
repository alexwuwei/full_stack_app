'use strict';

require(__dirname + '/../../bower_components/angular/angular.js');
// require(__dirname + '/../../bower_components/angular/angular-route.js');
require('angular-route');
require(__dirname + '/../css/normalize.css');
require(__dirname + '/../css/main.css');
require(__dirname + '/../css/animate.css');
require(__dirname + '/customers/customer-module.js');
require(__dirname + '/customers/customers.js');
require(__dirname + '/products/products-module.js');
require(__dirname + '/products/products.js');
require(__dirname + '/services/http-service.js');
require(__dirname + '/services/auth-service.js');
require(__dirname + '/services/error-service.js');


(function() {
  angular.module('app', [
    'customers',
    'products',
    'ngRoute'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/customers', {
      templateUrl: './templates/customer-template.html'
    }).when('/products', {
      templateUrl: './templates/product-template.html'
    }).when('/', {
      templateUrl: './templates/customer-template.html'
    }).when('/signup', {
      templateUrl: './templates/signup-in.html',
      controller: 'CustomerController',
      controllerAs: 'custctrl'
    })
  }]);
})();
