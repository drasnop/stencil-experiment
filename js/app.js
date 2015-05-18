var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(function($window, $http) {
   // generate a unique ID for each participant
   if ($window.state.email === "")
      $window.state.email = generateRandomString(8);
   console.log("participant email:", $window.state.email)

   // randomly assign participant to one interface and with opposite defaults or not
   state.condition = {
      "interface": 3,
      //"interface": Math.floor(Math.random() * 4),
      "oppositeDefaults": (Math.random() < 0.5 ? false : true)
   }

   // store the ID in firebase (will be checked from my software on wunderlist.com)
   state.firebase = new Firebase("https://incandescent-torch-4042.firebaseio.com/stencil-experiment/mturk/" + state.email);
   state.firebase.child("/condition").set(state.condition)

   // retrieve bookmarklet code
   $http.get("/bookmarklets/bookmarklet-setup.js").success(function(data) {
      console.log("bookmarklet-setup retrieved successfully")

      if (state.serverURL === "localhost:8888")
         state.bookmarkletCode = data.replace("tequila.cs.ubc.ca/stencil", "localhost:8888");
      else
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
