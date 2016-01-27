'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

angular.module('starter')
  .factory('Promos', ['$resource', function($resource) {

    return $resource('http://dev.localight.com:3001/admins/promocodes/:id', {
      id: '@id'
    }, {
      query: {
        method: 'GET',
        params: {
          id: ''
        },
        isArray: true
      },
      getById: {
        method: 'GET',
        params: {
          id: '@id'
        },
        isArray: false
      }
    });
  }])
