'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */

angular.module('starter')

.service('alertHandler', function($ionicPopup, $ionicModal, loadingSpinner) {

    //Function to create an alert
    function createAlert(aTitle, aText, callback) {

        //Create the alert with the specified params
        var alertPopup = $ionicPopup.alert({
             title: aTitle,
             template: aText
           });
           alertPopup.then(function(res) {
             if(callback) callback();
           });

           //May have to return the alert
       }

       //Our login modal
       // Create the login modal that we will use later
       var loginModal = $ionicModal.fromTemplateUrl('templates/login.html', {
       }).then(function(modal) {
       });

    return {

        //Have an alert specifically for errors, and general alerts
        showAlert: function(aTitle, aText, callback) {

            //Simply call the helper function
            createAlert(aTitle, aText, callback);
        },

        /*
        Super awesome Error Handler
        params: error = http response,
        response handlers are
        an array of statuses and callbacks to
        override the default responses
        e.g [{status: 200, title: "hello", text: "sup", successCallback},
        {status: 409,  title: "bye", text: "later", conflictCallback}];
        */
        showError: function(error, responseHandlers) {

            //Stop loading, if we are loading
            loadingSpinner.stopLoading();

            //Our Handled status
            //Default to -1 since there is not -1 rest status
            var handledStatus = -1;

            //Search through our response handlers if we got a specific
            //error we wanted to Handle
            for(var i = 0; i < responseHandlers.length; i++) {

                //Check if our response Handler is for our status
                if(error.status == responseHandlers[i].status) {

                    //Make the handled status this status
                    handledStatus = error.status;

                    //Create the alert
                    createAlert(responseHandlers[i].title, responseHandlers[i].text, responseHandlers[i].callback())
                }
            }

            //Check if we handled any statuses, if we did not
            //Go through default error handling
            if(handledStatus == -1) {

                if (response.status == 401) {
                   //Handle 401 error code

                   //Pull up the login modal
                   loginModal.show();

                   //Delete the token
                   localStorage.removeItem("token");

                   //Show an error
                   createAlert("Session Error", "Session Token not found or invalidated, please log in!");
               }
               else if (response.status == 404) {
                 // Handle 404 error code

                 //Delete the token
                 localStorage.removeItem("token");

                 //Show an error
                 createAlert("No Connection!", "Internet Connection is required to use this app. Please connect to the internet with your device, and restart the app!");
               }
               else if (response.status == 500) {
                 // Handle 500 error code

                 //Show an error
                 createAlert("Server Error", "Either your connection is bad, or the server is having problems. Please try re-opening the app, or try again later!");
               }
               else {
                   //Handle General Error

                   //An unexpected error has occured, log into console
                   //Show an error
                   createAlert("Error: " + response.status, "Unexpected Error. Please try re-opening the app, or try again later!");
               }
            }
        }

    };
});
