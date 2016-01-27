angular.module('starter')

.controller('TransactionCtrl', function($scope, $stateParams, Transactions) {
    $scope.transaction = Transactions.get({
        id: $stateParams.transactionId,
        sessionToken: $scope.loggedIn
    }, function(result){
        console.log(result);
    });
});
