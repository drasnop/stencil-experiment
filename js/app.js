var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(function($window, $http) {
   $window.state.email = generateRandomString(8) + "@gmail.com";
   console.log("participant email:", $window.state.email)

   $http.get("https://" + state.serverURL + "/bookmarklets/bookmarklet-setup.js").success(function(data) {
      console.log("bookmarklet-setup retrieved successfully")
      state.bookmarkletCode = data;
   })

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

   $scope.checkInstallationCode = function() {
      state.installationSuccess = (state.installationCode == 3141);
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
