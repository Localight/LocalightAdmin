'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

//Get all the giftcards, or create one
angular.module('starter.filters', [])
.filter('transactionsByOption', function () {
    return function (transactions, options) {
        var items = {
            options: options,
            out: []
        };
        angular.forEach(transactions, function (value, key) {
            if(this.options.unpaid == true){
                if (value.paidOut != true) {
                    this.out.push(value);
                }
            } else {
                this.out.push(value);
            }

        }, items);
        return items.out;
    };
});
