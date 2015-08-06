var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(['$window', '$http', '$q', function($window, $http, $q) {

   // abort if browser is not firefox or chrome
   if (Browser.name != "Chrome" && Browser.name != "Firefox") {
      $("body").empty();
      alert("Fatal error! This experiment only works in Google Chrome or Mozilla Firefox. You won't be able to collect your reward. Please use one of these web browsers, or return this HIT.")
      return;
   }

   // retrieve bookmarklet code
   $http.get("bookmarklets/bookmarklet-setup.js").success(function(data) {
      console.log("bookmarklet-setup retrieved successfully");
      if (state.serverURL === "localhost:8888")
         state.bookmarkletCode = data.replace("tequila.cs.ubc.ca/stencil", "localhost:8888");
      else
         state.bookmarkletCode = data;
   })

   // retrieve information passed in the url and store them in state.urlParams
   var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function(s) {
         return decodeURIComponent(s.replace(pl, " "));
      },
      query = $window.location.search.substring(1);

   while ((match = search.exec(query)) !== null)
      state.urlParams[decode(match[1])] = decode(match[2]);


   // if this is a returning participant
   if (localStorage.stencilExperimentPage) {

      // Only allow participants coming back with the same worker_id, assignment_id and interface condition
      if ((state.urlParams.worker_id != localStorage.getObject("stencilExperimentInfo").worker_id) ||
         (state.urlParams.assignment_id != localStorage.getObject("stencilExperimentInfo").assignment_id) ||
         (state.urlParams.interface != localStorage.getObject("stencilExperimentCondition").interface)) {

         $("body").empty();
         alert("Sorry, you can participate only once in this experiment. Otherwise your HIT will be rejected.\n\nIf you have any question or concern, please email: aponsard@cs.ubc.ca");
         return;
      }

      // restore previous session
      state.email = localStorage.email;
      state.condition = localStorage.getObject('stencilExperimentCondition');
      state.info = localStorage.getObject('stencilExperimentInfo');

      console.log("Restored participant email:", $window.state.email)
      console.log("Restored", state.condition)
      console.log("Restored", state.info)

      // re-initialize
      state.firebase = new Firebase("https://incandescent-torch-4042.firebaseio.com/stencil-experiment/mturk/" + state.email);
      state.previousPageTimestamp = state.info.timestamp;

      // move to the last page that was stored
      state.page = Number(localStorage.stencilExperimentPage);
   }
}])


/* Extend localStorage for storing objects */

Storage.prototype.setObject = function(key, value) {
   this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
   var value = this.getItem(key);
   return value && JSON.parse(value);
}
