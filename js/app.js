var state = {
   "page": 0,
   "consentGiven": false,
   "email": "",
   "installationCode": "",
   "installationSuccess": false,

   // debug
   "goToPage": function(p){
      state.page=p;
      angular.element($("body")).scope().$apply();
   }
}

var app = angular.module('stencil-experiment', []);

app.run(function($window) {
   $window.state.email = generateRandomString(8) + "@gmail.com";
   console.log("participant email:", $window.state.email)
})

generateRandomString = function(length) {
   var string = "";
   var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

   for(var i = 0; i < length; i++)
      string += possible.charAt(Math.floor(Math.random() * possible.length));

   return string;
}

app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
   $scope.state = $window.state;

   $scope.printConsentForm = function() {
      $window.print();
   }

   $scope.checkInstallationCode = function() {
      state.installationSuccess = (state.installationCode == 3141);
   }
}])
