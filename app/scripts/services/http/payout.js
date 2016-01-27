'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

angular.module('starter')
  .factory('Payout', ['$resource', function($resource) {

    return $resource('http://dev.localight.com:3001/transactions/payouts/:id', {
      id: '@id'
    }, {
      create: {
        method: 'POST',
        params: {
          id: ''
        },
        isArray: false
      },
      query: {
        method: 'GET',
        params: {
          id: ''
        },
        isArray: true
      },
      get: {
        method: 'GET',
        params: {
          id: '@id'
        },
        isArray: false
      }
    });
}]);
