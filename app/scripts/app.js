// Ionic Starter App

//Define our controllers, services, and filters modules
//Couldn't figure this out, doing it the angular way, and
//simply adding everything to starter
// angular.module('starter.controllers', []);
// angular.module('starter.services', ['ngResource']);
// angular.module('starter.filters', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
'ionic-datepicker',
'nvd3ChartDirectives',
'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/modals/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.transactions', {
      url: '/transactions',
      views: {
        'menuContent': {
          templateUrl: 'templates/transactions.html',
          controller: 'TransactionsCtrl'
        }
      }
    })

    .state('app.transaction', {
      url: '/transactions/:transactionId',
      views: {
        'menuContent': {
          templateUrl: 'templates/transaction.html',
          controller: 'TransactionCtrl'
        }
      }
    })
    .state('app.payouts', {
      url: '/payouts',
      views: {
        'menuContent': {
          templateUrl: 'templates/payouts.html',
          controller: 'PayoutsCtrl'
        }
      }
    })
    .state('app.payout', {
      url: '/payouts/:payoutId',
      views: {
        'menuContent': {
          templateUrl: 'templates/payout.html',
          controller: 'PayoutCtrl'
        }
      }
    })
    .state('app.userStats', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/userStats.html',
          controller: 'UserStatsCtrl'
        }
      }
    })
    .state('app.recentUsers', {
      url: '/users/recent',
      views: {
        'menuContent': {
          templateUrl: 'templates/recentUsers.html',
          controller: 'RecentUsersCtrl'
        }
      }
    })
    .state('app.userById', {
      url: '/users/recent/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/userById.html',
          controller: 'UserByIdCtrl'
        }
      }
    })
    .state('app.promoCodes', {
      url: '/promo/view/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/promoCodes.html',
          controller: 'PromoCodesCtrl'
        }
      }
    })
    .state('app.createPromo', {
      url: '/promo/create',
      views: {
        'menuContent': {
          templateUrl: 'templates/createPromo.html',
          controller: 'CreatePromoCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/transactions');
});
