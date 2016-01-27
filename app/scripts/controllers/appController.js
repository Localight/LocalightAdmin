angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Accounts) {

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
      if($scope.regData.password === $scope.regData.confirm){
          Accounts.join($scope.regData, function(data){
              localStorage.setItem("token", data.token);
              $scope.closeRegister();
          }, function(err){
              if(err.status == 401){
                  document.getElementById("kLabel").className += " error";
              } else {
                  console.log(err);
                  alert("There was an error. Please check the console.");
              }
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
    Accounts.login($scope.loginData, function(data){
        localStorage.setItem("token", data.token);
        $scope.closeLogin();
    }, function(err){
        if(err.status == 401){
            document.getElementById("uLabel").className += " error";
            document.getElementById("pLabel").className += " error";
        } else {
            console.log(err);
            alert("There was an error. Please check the console.");
        }
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
