var state = {
   "page": 1,
   "email": ""
}

var app = angular.module('stencil-experiment', []);

app.run(function($window){
   $window.state.email=generateRandomString(8) + "@gmail.com";
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
}])
