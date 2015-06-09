var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(['$window', '$http', '$q', function($window, $http, $q) {

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
}])
