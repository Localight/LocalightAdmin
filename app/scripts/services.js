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
  }])
  .factory('Transactions', ['$resource', function($resource) {

    return $resource('http://dev.localight.com:3001/transactions/:id', {
      id: '@id'
    }, {
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
  }])
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
  }])
  .factory('Users', ['$resource', function($resource) {

    return $resource('http://dev.localight.com:3001/transactions/:id', {
      id: '@id'
    }, {
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
  }])
  .factory('Promos', ['$resource', function($resource) {

    return $resource('http://dev.localight.com:3001/promocodes/:id', {
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

  .service('loadingSpinner', function() {

    //Boolean if are loading
    var loading = false;

    return {

        //Needs to be a function,
        //or else will not update across controllers
        isLoading: function() {
            if(loading) return true
            else return false
        },

        startLoading: function() {

            //First, make the body non interactable
            document.body.class = document.body.class + " noTouch";

            loading = true;
            console.log(loading);
            return true;
        },

        stopLoading: function() {

            //First, make the body interactable again
            document.body.class = document.body.class.replace(" noTouch", "");

            loading = false;
            return false;
        }
    };
})

.service('alertHandler', function($ionicPopup, loadingSpinner) {

    return {

        //Have an alert specifically for errors, and general alerts
        showAlert: function(aTitle, aText, callback) {
            if(loading) return true
            else return false
        },

        showError: function(error, aTitle, aText, callback) {
            if(loading) return true
            else return false
        }

    };
});
