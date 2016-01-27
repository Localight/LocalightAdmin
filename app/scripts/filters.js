'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

//Get all the giftcards, or create one
angular.module('starter')
.filter('transactionsByOption', function () {
    return function (transactions, options) {
        var items = {
            options: options,
            out: []
        };
        angular.forEach(transactions, function (value, key) {
            //Transform value into a real date object
            var createdDate = new Date(value.created);
            //Create a startDate in the past if not defined
            var startDate = (this.options.startDate) ? this.options.startDate : new Date("October 13, 2011 11:13:00");
            //Create an endDate of today if not defined
            var endDate = (this.options.endDate) ? this.options.endDate : new Date();
            //Validate the date based on daterange. This should be true if no startDate or endDate was passed, or true if the date is within provided range.
            var validDate = createdDate > startDate && createdDate < endDate;

            //Decide if we should add to the output array
            if(validDate){
                if(this.options.unpaid == true){
                    if(value.paidOut != true){
                        this.out.push(value);
                    }
                } else {
                    this.out.push(value);
                }
            }
        }, items);
        return items.out;
    };
});
