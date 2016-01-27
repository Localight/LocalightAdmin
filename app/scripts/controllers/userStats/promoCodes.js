angular.module('starter')

.controller('PromoCodesCtrl', function($scope,
    loadingSpinner, alertHandler, $state) {

    //First grab the promo code in initialization
    $scope.initPromo = function() {

        //Create our payload
        var payload = {
            sessionToken: localStorafe.getItem("token");
        };
    }
    $scope.initPromo();
});
