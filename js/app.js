var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(function($window, $http) {
   // generate a unique ID for each participant
   $window.state.email = generateRandomString(8);
   console.log("participant email:", $window.state.email)

   // store the ID in firebase (will be checked from my software on wunderlist.com)
   state.firebase = new Firebase("https://incandescent-torch-4042.firebaseio.com/stencil-experiment/mturk/" + state.email);
   state.firebase.child("/condition").set(Math.floor(Math.random() * 4))

   // retrieve bookmarklet code
   $http.get("https://" + state.serverURL + "/bookmarklets/bookmarklet-setup.js").success(function(data) {
      console.log("bookmarklet-setup retrieved successfully")
      state.bookmarkletCode = data;
   })


   // helper
   function generateRandomString(length) {
      var string = "";
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++)
         string += possible.charAt(Math.floor(Math.random() * possible.length));

      return string;
   }
})


app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
   $scope.state = $window.state;

   $scope.printConsentForm = function() {
      $window.print();
   }

   $scope.checkExperimentCompleted = function() {
      state.experimentCheckClicked = true;
      state.experimentCompleted = state.firebase.child('/trials').length >= 1;
   }

   $scope.pageLinkClicked = function(page) {
      if (page <= state.page) {
         state.page = page;
      }
   }

   $scope.goToNextPage = function() {
      state.page++;
      $window.scrollTo(0, 0);
   }
}])
