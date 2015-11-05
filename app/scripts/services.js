'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

//Get all the giftcards, or create one
angular.module('starter.services', ['ngResource'])
  .factory('Transactions', ['$resource', function($resource) {

    return $resource('http://localhost:3000/transactions', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: true
      }
    });
  }]);
