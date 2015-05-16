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
   $scope.data = {
      // initialize some data to make the validation easier
      "age": null,
      "ageNA": false
   };

   $scope.isAgeValid = function() {
      return $scope.data.age !== null && typeof $scope.data.age == "number" && $scope.data.age >= 18 && $scope.data.age <= 100;
   }

   $scope.isDataValid = function() {
      return ($scope.isAgeValid() || $scope.data.ageNA) && $scope.data.hasOwnProperty("gender") &&
         $scope.data.hasOwnProperty("computerUse") && $scope.data.hasOwnProperty("wunderlistUse");
   }

   $scope.submitAndContinue = function() {
      console.log($scope.data)
      state.firebase.child("/demographics").set($scope.data)
      $scope.goToNextPage();
   }
})

app.controller('preferenceCtrl', function($scope) {
   $scope.data = {};

   $scope.isDataValid = function() {
      return $scope.data.hasOwnProperty("easeOfUse") && $scope.data.hasOwnProperty("liking");
   }

   $scope.submitAndContinue = function() {
      console.log($scope.data)
      state.firebase.child("/preference").set($scope.data)
      $scope.goToNextPage();
   }
})

app.controller('recognitionCtrl', function($scope) {

   $scope.tabs = shuffleArray([{
      "name": "General",
      "fake": false,
      "remembered": null
   }, {
      "name": "Shortcuts",
      "fake": false,
      "remembered": null
   }, {
      "name": "Smart Lists",
      "fake": false,
      "remembered": null
   }, {
      "name": "Notifications",
      "fake": false,
      "remembered": null
   }, {
      "name": "Account",
      "fake": false,
      "remembered": null
   }, {
      "name": "Display",
      "fake": true,
      "remembered": null
   }, {
      "name": "Sounds",
      "fake": true,
      "remembered": null
   }, {
      "name": "Sync",
      "fake": true,
      "remembered": null
   }, {
      "name": "Reminders",
      "fake": true,
      "remembered": null
   }, {
      "name": "Network",
      "fake": true,
      "remembered": null
   }]);

   function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }
      return array;
   }

   function cleanUpModel(array) {
      var output = $.extend([], array);
      output.forEach(function(elem) {
         delete elem["$$hashKey"];
      });
      return output;
   }

   $scope.isDataValid = function() {
      for (var i in $scope.tabs) {
         if ($scope.tabs[i].remembered === null)
            return false;
      }
      return true;
   }

   $scope.submitAndContinue = function() {
      state.firebase.child("/recognition/tabs").set(cleanUpModel($scope.tabs))
      $scope.goToNextPage();
   }
})
