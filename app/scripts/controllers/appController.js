angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal,
    $timeout, Accounts, loadingSpinner, alertHandler,
    $window) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  // Form data for the register modal
  $scope.regData = {};

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

  $scope.formatDate = function(date){
      return new Date(date).toDateString("en-us", {year: "numeric", month: "short", day: "numeric"});
  }

  // Create the register modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modals/register.html', {
    scope: $scope
  }).then(function(register) {
    $scope.register = register;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.register.hide();
  };

  // Open the login modal
  $scope.openRegister = function() {
    $scope.register.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function() {

      //Start loading
      loadingSpinner.startLoading();

      if($scope.regData.password === $scope.regData.confirm){
          Accounts.join($scope.regData, function(data){
              localStorage.setItem("token", data.token);


              //Alert the user the page will refresh
              alertHandler.showAlert("Registration Success!",
              "Thank you for joining Localight! The app will now refresh...",
              function() {
                  $window.location.reload();
              })
          }, function(err) {

              //Show the error
              alertHandler.showError(err, [
                  {
                      status: 401,
                      title: "Wrong Secret Key",
                      text: "Your secret key is invalid, please contact an administrator and try again",
                      callback: function() {
                          document.getElementById("kLabel").className += " error";
                      }

                  }
              ]);
          });
      } else {
          document.getElementById("confirmInput").value = "";
          document.getElementById("confirmInput").focus();
      }
  }

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modals/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  }

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

      //Start loading
      loadingSpinner.startLoading();

    Accounts.login($scope.loginData, function(data){
        localStorage.setItem("token", data.token);


        //Alert the user the page will refresh
        alertHandler.showAlert("Login Success!",
        "The app will now refresh...",
        function() {
            $window.location.reload();
        })
    }, function(err){

        //Show the error
        alertHandler.showError(err, [
            {
                status: 401,
                title: "Login Failed",
                text: "Please check your username and password!",
                callback: function() {
                    document.getElementById("uLabel").className += " error";
                    document.getElementById("pLabel").className += " error";
                }

            }
        ]);
    });
  }

  if(localStorage.token){
      $scope.loggedIn = localStorage.token;
  } else {
      $scope.loggedIn = false;
      $timeout(function(){
          $scope.login();
      }, 400);
  }
});
