angular.module('starter')

.controller('SpinnerCtrl', function($scope, $stateParams, loadingSpinner) {

    //Initialize our loading spinner
    $scope.loading = loadingSpinner;
});
