angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TransactionsCtrl', function($scope, $resource, Transactions) {
    $scope.filterOptions = {};
    $scope.getTransactions = function(){
        var unpaid;
        if($scope.filterOptions == 1) unpaid = "true";
        $scope.transactions = Transactions.query({
            paid: unpaid,
            created_after: $scope.filterOptions.startDate,
            created_before: $scope.filterOptions.endDate
        }, function(){
            console.log("dfd");
        });

    }

    $scope.getTransactions();

    $scope.selectedItems = {};
    $scope.fuckinHell = function(){
        console.log($scope.selectedItems);
    }

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
            $scope.selectedItems[$scope.transactions[i]._id] = true;
        }
        console.log($scope.selectedItems);
     }

     $scope.initiatePayout = function(){
         $scope.selectedItems["fuck"] = true;
         var payout = [];
         for(var i=0;i<$scope.transactions.length;i++){
             console.log($scope.selectedItems);
             if($scope.selectedItems[$scope.transactions[i]._id]){
                 payout.add($scope.transactions[i]._id);
                 console.log("dfdasdfs");
             }
         }
         console.log(payout);
     }
})

.controller('TransactionCtrl', function($scope, $stateParams) {

});
