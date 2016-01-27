angular.module('starter')

.controller('TransactionCtrl', function($scope, $stateParams,
    Transactions, loadingSpinner, alertHandler) {

    //Start loading
    loadingSpinner.startLoading();

    $scope.transaction = Transactions.get({
        id: $stateParams.transactionId,
        sessionToken: $scope.loggedIn
    }, function(result){
        //console.log(result);

        //Stop loading, if we are loading
        loadingSpinner.stopLoading();
    },
    //Error
    function(response) {
        alertHandler.showError(response);
    });
});
