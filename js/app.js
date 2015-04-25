var state = {
   "page": 3
}


var app = angular.module('stencil-experiment', []);

app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
   $scope.state = $window.state;
}])
