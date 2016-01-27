angular.module('starter')

.controller('PayoutsCtrl', function($scope, $state, $resource, $location,
    Transactions, Payout, alertHandler, loadingSpinner) {

    $scope.goToPayout = function(payoutId){
        $state.go('app.payout', {payoutId: payoutId});
    }

    //Initilaization function
    $scope.initPayouts = function() {

        //Start loading
        loadingSpinner.startLoading();

        //Add our sessiont token payload
        var payload = {
            sessionToken: localStorage.getItem("token")
        }

        //Query the payouts
        Payout.query(payload, function(response) {

            //Success!

            //Set the payouts to scope
            $scope.payouts = response;
        },
        //error
        function(response) {
            //Show the error
            alertHandler.showError(response);
        });
    }

    //Initialize the function
    $scope.initPayouts();
});
