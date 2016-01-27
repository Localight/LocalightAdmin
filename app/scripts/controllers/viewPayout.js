angular.module('starter')

.controller('PayoutCtrl', function($scope, $state, $stateParams, $resource, $location, Transactions, Payout) {
    $scope.goToTransaction = function(transactionId){
        $state.go('app.transaction', {transactionId: transactionId});
    }
    $scope.groups = [];
    $scope.toggleGroup = function(group) {
        group.show = !group.show;
    };
    $scope.isGroupShown = function(group) {
        return group.show;
    };
    $scope.payout = Payout.get({
        id: $stateParams.payoutId,
        sessionToken: localStorage.getItem("token")
    }, function(payout){
        for (var i=0; i<payout.locations.length; i++) {
            $scope.groups[i] = {
                name: payout.locations[i].location.name + " - $" + payout.locations[i].amount,
                items: [],
                show: false
            }
            for(var j=0; j<payout.transactions.length; j++){
                if(payout.transactions[j].locationId._id == payout.locations[i].location._id){
                    $scope.groups[i].items.push({
                        title: "Transaction for $" + payout.transactions[j].amount + " on " + payout.transactions[j].created,
                        id: payout.transactions[j]._id
                    });
                }
            }
        }
    });

});
