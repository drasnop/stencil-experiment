app.controller('MainCtrl', ['$scope', '$window', '$http', function($scope, $window, $http) {
   $scope.state = $window.state;
   $scope.sslSuccess = false;

   /* when users click "accepct consent form", initialize everything */

   $scope.initializeParticipant = function() {

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

      // store the ID + the condition in firebase (will be checked from my software on wunderlist.com)
      state.firebase = new Firebase("https://incandescent-torch-4042.firebaseio.com/stencil-experiment/mturk/" + state.email);
      state.firebase.child("/condition").set(state.condition)

      // close connection to firebase, to avoid too many concurrent connections
      //Firebase.goOffline();

      // helper
      function generateRandomString(length) {
         var string = "";
         var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

         for (var i = 0; i < length; i++)
            string += possible.charAt(Math.floor(Math.random() * possible.length));

         return string;
      }
   }
   $scope.initializeParticipant();


   /* basic utilities function to manage progress */

   $scope.printConsentForm = function() {
      $window.print();
   }

   $scope.checkSSL = function() {
      console.log(state.sslCode)
      $scope.sslSuccess = (state.sslCode == 9876);
   }

   $scope.checkExperimentCompleted = function() {
      // From this point on, the connection to the firebase should be maintained
      // except if participants haven't completed the experiment yet, in which case we go offline again
      Firebase.goOnline();

      // test if 10 trials were performed by this participant
      state.firebase.child('/trials').once("value", function(trialsSnapshot) {
         state.experimentCompleted = (trialsSnapshot.numChildren() >= 10);
         console.log(state.experimentCompleted ? "experiment completed!" : "Failure: experiment not completed")

         if (state.experimentCompleted)
            state.computeCurrentBonusFromTrials(trialsSnapshot);
         else
            Firebase.goOffline();

         state.experimentCheckClicked = true;
         angular.element("body").scope().$apply();
      })

   }

   $scope.additionalFeedback = "";
   $scope.submitAdditionalFeedback = function() {
      console.log($scope.additionalFeedback)
      state.firebase.child("/additionalFeedback").set($scope.additionalFeedback);
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

   /* init */

   $scope.tabs = shuffleArray([{
      "name": "General",
      "present": true,
      "remembered": null
   }, {
      "name": "Shortcuts",
      "present": true,
      "remembered": null
   }, {
      "name": "Smart Lists",
      "present": true,
      "remembered": null
   }, {
      "name": "Notifications",
      "present": true,
      "remembered": null
   }, {
      "name": "Account",
      "present": true,
      "remembered": null
   }, {
      "name": "Display",
      "present": false,
      "remembered": null
   }, {
      "name": "Sounds",
      "present": false,
      "remembered": null
   }, {
      "name": "Sync",
      "present": false,
      "remembered": null
   }, {
      "name": "Reminders",
      "present": false,
      "remembered": null
   }, {
      "name": "Security",
      "present": false,
      "remembered": null
   }]);

   $scope.tabsBonus = function() {
      return $scope.computeBonus($scope.tabs, state.bonusPerTab);
   }

   // dynamically generate options, mixing randomly selected real ones and fake ones
   generateOptions();

   var fakeOptions = [{
      "label": "Show details panel when adding an item",
      "present": false,
      "remembered": null
   }, {
      "label": "Time Zone",
      "values": [{
         "label": "EST (GMT-5)"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Confirm before deleting list",
      "present": false,
      "remembered": null
   }, {
      "label": "Open 'Upcoming' Smart List",
      "values": [{
         "label": "CTRL + 7"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Print Selected List",
      "values": [{
         "label": "CTRL + P"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Edit Item Details",
      "values": [{
         "label": "CTRL + E"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Open Sharing Preferences",
      "values": [{
         "label": "CTRL + S"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Tomorrow",
      "values": [{
         "label": "visible"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Overdue",
      "values": [{
         "label": "visible"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "SMS Notifications",
      "present": false,
      "remembered": null
   }];

   $scope.optionsBonus = function() {
      return $scope.computeBonus($scope.options, state.bonusPerOption);
   }

   function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }
      return array;
   }

   function generateOptions() {
      state.firebase.child('/optionsToRecognize').once("value", function(optionsSnapshot) {
         var realOptions = optionsSnapshot.val();

         // set all these options as 'present'
         realOptions.forEach(function(option) {
            option.present = true;
         });

         // randomly merge real and fake options
         $scope.options = shuffleArray(realOptions.concat(fakeOptions));
         $scope.$apply();
      })
   }

   /* display of questionnaires */

   $scope.printOption = function(option) {
      // we must check both if option.values exist (for fake options) and if it has length 0 (for wunderlist_options)
      return option.label + (option.values && option.values.length ? " [" + option.values[0].label + "]" : "");
   }

   $scope.submitTabs = function() {
      state.tabsSubmitted = true;
      check($scope.tabs);
      state.firebase.child("/recognition/tabs/responses").set(cleanUpModel($scope.tabs));
      state.firebase.child("/recognition/tabs/score").set($scope.computeNumCorrects($scope.tabs));
   }

   $scope.submitOptions = function() {
      state.optionsSubmitted = true;
      check($scope.options);
      state.firebase.child("/recognition/options/responses").set(cleanUpModel($scope.options));
      state.firebase.child("/recognition/options/score").set($scope.computeNumCorrects($scope.options));
   }


   function check(array) {
      array.forEach(function(element) {
         element.correct = (element.present === element.remembered);
      });
   }

   $scope.computeBonus = function(array, bonusPerCorrect) {
      var corrects = $scope.computeNumCorrects(array);
      return Math.max(0, (corrects - (array.length - corrects)) * bonusPerCorrect);
   }

   $scope.computeNumCorrects = function(array) {
      return array.reduce(function(sum, element) {
         return sum += element.correct;
      }, 0);
   }


   /* logging */

   function cleanUpModel(array) {
      var output = $.extend([], array);
      output.forEach(function(elem) {
         delete elem["$$hashKey"];
      });
      return output;
   }

   $scope.isTabDataValid = function() {
      for (var i in $scope.tabs) {
         if ($scope.tabs[i].remembered === null)
            return false;
      }
      return true;
   }

   $scope.isOptionDataValid = function() {
      for (var i in $scope.options) {
         if ($scope.options[i].remembered === null)
            return false;
      }
      return true;
   }

   $scope.submitAndContinue = function() {
      $scope.goToNextPage();
   }
})

app.controller('doneCtrl', function($scope) {
   // In case participants leave the tab open in their browser, close the connection
   Firebase.goOffline();

   $scope.data = {};

   $scope.submit = function() {
      Firebase.goOnline();
      state.firebase.child("/additionalFeedback").set($scope.data.additionalFeedback, function(error) {
         if (error)
            console.log("Error: couldn't upload", $scope.data.additionalFeedback)
         else
            console.log("successfully uploaded", $scope.data.additionalFeedback)
         Firebase.goOffline();
      })
   }
})
