javascript: (function(e, a, g, h, f, c, b, d) {
   if (!(f = e.jQuery) || g > f.fn.jquery || h(f)) {
      console.log('fetching jQuery ' + g);
      c = a.createElement('script');
      c.type = 'text/javascript';
      c.src = 'https://ajax.googleapis.com/ajax/libs/jquery/' + g + '/jquery.min.js';
      c.onload = c.onreadystatechange = function() {
         if (!b && (!(d = this.readyState) || d == 'loaded' || d == 'complete')) {
            h((f = e.jQuery).noConflict(1), b = 1);
            f(c).remove()
         }
      };
      a.documentElement.childNodes[0].appendChild(c);
   } else {
      console.log('jQuery ', g, 'already present')
   }
})(window, document, '2.1.0', function(j, L) {
   window.jQuery = j;
   window.$ = window.jQuery;

   /* limit use to wunderlist */
   if (window.location.hostname !== "www.wunderlist.com") {
      alert("To setup the experiment software, you must:\n • drag-and-drop this bookmark in your bookmark bar\n • open a new tab\n • go to the page https://www.wunderlist.com/webapp\n • when the page is fully loaded, click on this bookmark.");
      return;
   }

   /* set the location to the proper url, if necessary */
   if (window.location.pathname !== "/webapp") {
      alert("• This page is going to reload.\n• Once it is fully loaded, please click this bookmark again.");
      window.location.assign("https://www.wunderlist.com/webapp#/lists/inbox");
      return;
   }

   /* prevent multiple clicks */
   if (typeof longAndComplexVariableNameToCheckIfAlreadyClicked !== "undefined") {
      alert("Please wait 15-20 seconds to let the experiment software load.\n\nAfter this delay, if you don't see any changes, you can try to reload the page, then click on this bookmark again.");
      return;
   }

   window.longAndComplexVariableNameToCheckIfAlreadyClicked = true;


   /* set the location to the inbox */
   window.location.assign("https://www.wunderlist.com/webapp#/lists/inbox");

   /* remove the first tutorial popup*/
   $(".popover.AddItem").remove();


   setTimeout(function() {
      alert("The experiment software is loading... Please wait a few seconds.");
   }, 10);

   var serverURL = 'tequila.cs.ubc.ca/stencil';

   $('<link/>', {
      rel: 'stylesheet',
      type: 'text/css',
      crossorigin: 'anonymous',
      href: '//' + serverURL + '/css/bootstrap.css'
   }).appendTo('head');
   $('<link/>', {
      rel: 'stylesheet',
      type: 'text/css',
      crossorigin: 'anonymous',
      href: '//' + serverURL + '/css/style.css'
   }).appendTo('head');

   $.when(
      $.getScript('//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.js'),
      $.Deferred(function(deferred) {
         $(deferred.resolve);
      })
   ).done(function() {
      $.when(
         $.getScript('//ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular-sanitize.js'),
         $.getScript('//cdn.firebase.com/js/client/2.2.4/firebase.js'),
         $.getScript('//' + serverURL + '/js/experiment/logger.js'),
         $.getScript('//' + serverURL + '/js/experiment/sequencer.js'),
         $.getScript('//' + serverURL + '/js/experiment/trial.js'),
         $.Deferred(function(deferred) {
            $(deferred.resolve);
         })
      ).done(function() {
         $.when(
            $.getScript('//' + serverURL + '/libs/jquery-ui-position.js'),
            $.getScript('//' + serverURL + '/libs/object-watch.js'),
            $.getScript('//' + serverURL + '/libs/bootstrap.js'),
            $.getScript('//' + serverURL + '/libs/browser.js'),
            $.getScript('//' + serverURL + '/js/core/global.js'),
            $.getScript('//' + serverURL + '/js/experiment/tutorial.js'),
            $.getScript('//' + serverURL + '/js/experiment/experimentTrials.js'),
            $.getScript('//' + serverURL + '/js/experiment/wunderlist-listeners.js'),
            $.getScript('//' + serverURL + '/js/experiment/sequenceGenerator.js'),
            $.getScript('//' + serverURL + '/js/experiment/experiment.js'),
            $.getScript('//' + serverURL + '/js/core/view.js'),
            $.getScript('//' + serverURL + '/js/core/geometry.js'),
            $.getScript('//' + serverURL + '/js/core/dataManager.js'),
            $.getScript('//' + serverURL + '/js/core/app.js'),
            $.getScript('//' + serverURL + '/js/core/controllers.js'),
            $.getScript('//' + serverURL + '/js/core/listeners.js'),
            $.getScript('//' + serverURL + '/js/core/hooksManager.js'),
            $.getScript('//' + serverURL + '/js/core/helpers.js'),
            $.getScript('//' + serverURL + '/js/core/main.js'),
            $.Deferred(function(deferred) {
               $(deferred.resolve);
            })
         ).done(function() {
            initialize();
         })
      })
   });
});
