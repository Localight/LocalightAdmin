angular.module('starter')

.controller('CreatePromoCtrl', function($scope,
    loadingSpinner, alertHandler, Promos,
    $state) {

    //Form Data
    $scope.formData = {};

    //Ran out of time
    $scope.validNumber = function(data, max, min){

        if(isNaN(data) || data > max || data < min) {
            return false;
        }
        return true;
    }

    $scope.ignoreSpace = function(event) {
        if(event.keyCode == 32) event.preventDefault();
    }

    //Simply send a new promo code
    $scope.createPromo = function(formData) {

        //Start loadingSpinner
        loadingSpinner.startLoading();

        //For the backend, all numbers must be strings
        //The keyword must be forced lowercase
        //and the sms must have a space at the end
        var payload = {
            sessionToken: localStorage.getItem("token"),
            keyword: $scope.formData.keyword.toLowerCase(),
            amount: "" + $scope.formData.amount,
            message: $scope.formData.message,
            sms: $scope.formData.sms + " ",
            fromName: $scope.formData.sender,
            //Phone numbers must have the area code 100
            fromPhone: "100" + $scope.formData.phone,
            locationCode: "" + $scope.formData.location
        };

        //Send the payload and create the promo
        Promos.create(payload, function(response) {

            //Success!
            //stop LOADING
            loadingSpinner.stopLoading();

            //Move them back to the user stats page
            alertHandler.showAlert("Success!", "Promo Successfully created!", function() {
                $state.go('app.userStats');
            })
        },
        //error
        function(response) {
            alertHandler.showError(response, [
                {
                    status: 412,
                    title: "Incorrect data!",
                    text: "Please check your input, something you entered is invalid",
                }
            ])
        })
    }



});
