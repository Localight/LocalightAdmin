'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

angular.module('starter')
  .factory('Accounts', ['$resource', function($resource) {

    return $resource('http://dev.localight.com:3001/admins/:id', {
      id: '@id'
    }, {
      join: {
        method: 'POST',
        params: {
          id: 'join'
        },
        isArray: false
      },
      login: {
        method: 'POST',
        params: {
          id: 'login'
        },
        isArray: false
      }
    });
}]);
