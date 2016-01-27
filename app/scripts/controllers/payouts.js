angular.module('starter')

.controller('PayoutsCtrl', function($scope, $state, $resource, $location, Transactions, Payout) {
    $scope.goToPayout = function(payoutId){
        $state.go('app.payout', {payoutId: payoutId});
    }
    $scope.payouts = Payout.query();
});
