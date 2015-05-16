var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(function($window, $http) {
   // generate a unique ID for each participant
   //$window.state.email = generateRandomString(8);
   $window.state.email = "skjrpxbh";
   console.log("participant email:", $window.state.email)

   // store the ID in firebase (will be checked from my software on wunderlist.com)
   state.firebase = new Firebase("https://incandescent-torch-4042.firebaseio.com/stencil-experiment/mturk/" + state.email);
   state.firebase.child("/condition").set(Math.floor(Math.random() * 4))

   // retrieve bookmarklet code
   //$http.get("http://www.cs.ubc.ca/~aponsard/experiment/bookmarklets/bookmarklet-setup.js").success(function(data) {
   $http.get("https://localhost:8888/bookmarklets/bookmarklet-setup.js").success(function(data) {
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
