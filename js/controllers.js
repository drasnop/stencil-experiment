app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
   $scope.state = $window.state;

   $scope.sslSuccess = false;

   $scope.printConsentForm = function() {
      $window.print();
   }

   $scope.checkSSL = function() {
      console.log(state.sslCode)
      $scope.sslSuccess = (state.sslCode == 9876);
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
      "label": "Time zone",
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
      "label": "Print selected list",
      "values": [{
         "label": "CTRL + P"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Edit item details",
      "values": [{
         "label": "CTRL + E"
      }],
      "present": false,
      "remembered": null
   }, {
      "label": "Open sharing preferences",
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
      state.firebase.child('/tabs').once("value", function(tabsSnapshot) {
         // 1: retrieve all the tabs, with their corrresponding options
         var tabs = tabsSnapshot.val();
         console.log("experiment tabs retrieved", tabs);

         // 2a: select one third of options per tab, with a maximum of 4
         var numOptionsPerTab = {
            "General": 3,
            "Shortcuts": 4,
            "Smart Lists": 2,
            "Notifications": 1
         }

         // 2b: randomly pick an appropriate number of options in each tab, respecting some constraints
         var realOptions = [];
         for (var tabName in tabs) {
            // get options from tab t, excluding the forbidden options
            // TODO filter and return, to create deep copy?
            var allowedOptions = tabs[tabName].options;

            // randomly pick numOptionsPerTab[t] options      
            shuffleArray(allowedOptions);
            Array.prototype.push.apply(realOptions, allowedOptions.slice(0, numOptionsPerTab[tabName]));
         }
         console.log(realOptions)

         // 3: randomly merge real and fake options
         Array.prototype.push.apply(realOptions, fakeOptions);
         $scope.options = shuffleArray(realOptions);
         $scope.$apply();
      })
   }

   /* display of questionnaires */

   $scope.printOption = function(option) {
      return option.label + (option.values ? " [" + option.values[0].label + "]" : "");
   }

   $scope.submitTabs = function() {
      state.tabsSubmitted = true;
      check($scope.tabs);
      state.firebase.child("/recognition/tabs").set(cleanUpModel($scope.tabs));
   }

   $scope.submitOptions = function() {
      state.optionsSubmitted = true;
      check($scope.options);
      state.firebase.child("/recognition/options").set(cleanUpModel($scope.options));
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
