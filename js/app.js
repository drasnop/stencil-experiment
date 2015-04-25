var state = {
   "page": 3,
   "consentGiven": false,
   "email": "",
   "installationCode": "",
   "installationSuccess": false
}

var app = angular.module('stencil-experiment', []);

app.run(function($window) {
   $window.state.email = generateRandomString(8) + "@gmail.com";
})

generateRandomString = function(length) {
   var string = "";
   var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

   for(var i = 0; i < length; i++)
      string += possible.charAt(Math.floor(Math.random() * possible.length));

   console.log(string)
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
