angular.module('starter')

.controller('TransactionsCtrl', function($scope, $state, $resource, $location,
    Transactions, Payout, loadingSpinner, alertHandler) {

    //Initialization

    //Selected items for payouts
    $scope.selectedItems = {};
    $scope.selectedItemsLength = 0;
    $scope.getSelectedItems = function(clear){

        if(clear){
            for (var member in $scope.selectedItems) delete $scope.selectedItems[member];
        }
        $scope.selectedItemsLength = 0;
        var keys = Object.keys($scope.selectedItems);
        for(var i=0;i<keys.length;i++){
            if($scope.selectedItems[keys[i]]){
                $scope.selectedItemsLength++;
            }
        }
    }

    $scope.filterOptions = {};
    $scope.transactions = [];
    $scope.getTransactions = function(){

        //Start loading
        loadingSpinner.startLoading();

        var unpaid;
        if($scope.filterOptions.unpaid == true) unpaid = "false";
        $scope.getSelectedItems(true);
        $scope.transactions = Transactions.query({
            paidOut: unpaid,
            created_after: $scope.filterOptions.startDate,
            created_before: $scope.filterOptions.endDate,
            sessionToken: $scope.loggedIn
        },
        //Success
        function(response) {

        },
        //Error
        function(response) {
            alertHandler.showError(response);
        });
    }
    $scope.getTransactions();


    $scope.datepickerFrom = {
     titleLabel: 'Title',  //Optional
     todayLabel: 'Today',  //Optional
     closeLabel: 'Close',  //Optional
     setLabel: 'Set',  //Optional
     setButtonType : 'button-assertive',  //Optional
     todayButtonType : 'button-assertive',  //Optional
     closeButtonType : 'button-assertive',  //Optional
     inputDate: new Date(),  //Optional
     mondayFirst: true,  //Optional
     disabledDates: [], //Optional
     weekDaysList: [], //Optional
     monthList: [], //Optional
     templateType: 'popup', //Optional
     showTodayButton: 'true', //Optional
     modalHeaderColor: 'bar-positive', //Optional
     modalFooterColor: 'bar-positive', //Optional
     from: new Date(2012, 8, 2), //Optional
     to: new Date(2018, 8, 25),  //Optional
     callback: function (val) {  //Mandatory
       datepickerFromSelect(val);
     },
     dateFormat: 'dd-MM-yyyy', //Optional
     closeOnSelect: false, //Optional
    };

    var datepickerFromSelect = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.filterOptions.startDate = val;
        $scope.getTransactions();
      }
    };

    $scope.datepickerTo = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      disabledDates: [], //Optional
      weekDaysList: [], //Optional
      monthList: [], //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        datepickerToSelect(val);
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };

    var datepickerToSelect = function (val) {
       if (typeof(val) === 'undefined') {
         console.log('No date selected');
       } else {
           $scope.filterOptions.endDate = val;
           $scope.getTransactions();
       }
     };


     $scope.selectAll = function(){
        for(var i=0;i<$scope.transactions.length;i++){
            if(!$scope.transactions[i].paidOut){
                $scope.selectedItems[$scope.transactions[i]._id] = true;
            }
        }
        $scope.getSelectedItems();
     }
     $scope.isPaid = function(paidOut){
         return paidOut;
     }

     $scope.initiatePayout = function(){

         //Start loading
         loadingSpinner.startLoading();

         var payout = [];
         for(var i=0;i<$scope.transactions.length;i++){
             if($scope.selectedItems[$scope.transactions[i]._id]){
                 payout.push($scope.transactions[i]._id);
             }
         }

         var payload = {
             transactions: payout,
             method: "check",
             sessionToken: $scope.loggedIn
         }

        Payout.create(payload, function(payout){
            $state.go('app.payout', {payoutId: payout._id});
        }, function(err){
            //Error
            alertHandler.showError(err);
        });

         //Should empty the selected Items array here
     }
     $scope.goToTransaction = function(transactionId){
         $state.go('app.transaction', {transactionId: transactionId});
     }
});
