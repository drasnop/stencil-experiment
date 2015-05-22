var app = angular.module('stencil-experiment', []);

app.config([
   '$compileProvider',
   function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
   }
]);

app.run(['$window', '$http', '$q', function($window, $http, $q) {

   // load list of options and tabs
   loadData("wunderlist", preProcessOptionsAndTabs);

   // retrieve bookmarklet code
   $http.get("bookmarklets/bookmarklet-setup.js").success(function(data) {
      console.log("bookmarklet-setup retrieved successfully");
      if (state.serverURL === "localhost:8888")
         state.bookmarkletCode = data.replace("tequila.cs.ubc.ca/stencil", "localhost:8888");
      else
         state.bookmarkletCode = data;
   })



   /* ------- helpers ------------- */

   function loadData(applicationName, callback) {
      console.log("Loading " + applicationName + " options, mappings and tabs...")

      var promises = ["options", "tabs"].map(function(objectName) {
         return requestJSON(applicationName, objectName);
      });

      $q.all(promises).then(function(data) {
         console.log("All data loaded")
         callback();
      })

   }

   function requestJSON(applicationName, objectName) {
      return $http.get('//' + 'tequila.cs.ubc.ca/stencil' + '/data/' + objectName + '_' + applicationName + '.json').success(function(data) {
         console.log("Retrieved ", objectName)
         $window.state[objectName] = data;
      });
   }

   function preProcessOptionsAndTabs() {

      /* options */

      // creates a convenient enumerating (but non-enumerable!) function
      Object.defineProperty(state.options, "forEach", {
         value: function(callback) {
            Object.keys(this).forEach(function(key) {
               callback(this[key]);
            }, this)
         }
      })

      // convenient accessor for userAccessibleOptions
      Object.defineProperty(state.options, "getUserAccessibleOptions", {
         value: function() {
            var userAccessible = {};
            this.forEach(function(option) {
               if (typeof option.notUserAccessible === "undefined")
                  userAccessible[option.id] = option;
            });
            Object.defineProperty(userAccessible, "forEach", {
               value: state.options.forEach
            })
            return userAccessible;
         }
      })

      /* tabs */

      // replace tab.option_ids by pointers to actual options
      state.tabs.forEach(function(tab) {
         var tabOptions = tab.options.map(function(option_id) {
            return state.options[option_id];
         })
         tab.options = tabOptions;
      })

      // add pointer to tab (and index in that tab) to options
      state.tabs.forEach(function(tab) {
         for (var i = 0; i < tab.options.length; i++) {
            tab.options[i].tab = tab;
            // the display code only uses filteredIndex now, but this could be useful in the analysis
            tab.options[i].index = i;
         }
      })

      // add tab index information for future sorting
      for (var i = 0, len = state.tabs.length; i < len; i++) {
         state.tabs[i].index = i;
      }
   }
}])
