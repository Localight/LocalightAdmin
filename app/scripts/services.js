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

    return $resource('http://jnode.ngrok.kondeo.com:8080/transactions', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: true
        }
    });
  }]).factory('Payout', ['$resource', function($resource) {

    return $resource('http://jnode.ngrok.kondeo.com:8080/transactions/payouts/:id', { id: '@id' }, {
        create: {
            method: 'POST',
            params: { id: '' },
            isArray: false
        },
        query: {
            method: 'GET',
            params: { id: '' },
            isArray: true
        },
        get: {
            method: 'GET',
            params: { id: '@id' },
            isArray: false
        }
    });
  }]);
