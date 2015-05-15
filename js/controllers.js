app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
   $scope.state = $window.state;

   $scope.printConsentForm = function() {
      $window.print();
   }

   $scope.checkExperimentCompleted = function() {

      // test if 10 trials were performed by this participant
      state.firebase.child('/trials').once("value", function(trialsSnapshot) {
         state.experimentCompleted = (trialsSnapshot.numChildren() >= 10);
         console.log(state.experimentCompleted ? "experiment completed!" : "Failure: experiment not completed")

         state.computeCurrentBonusFromTrials(trialsSnapshot);

         state.experimentCheckClicked = true;
         angular.element("body").scope().$apply();
      })

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


app.controller('demographicsCtrl', function($scope) {
   $scope.data = {};

   $scope.submitAndContinue = function() {
      console.log($scope.data)
      $scope.goToNextPage();
   }
})
