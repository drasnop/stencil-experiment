var state = {
   // setup
   "serverURL": "localhost:8888",
   "bonusPerTrial": 0.1,
   "bookmarkletCode": "",
   "email": "",
   "firebase": "",
   "condition": "",

   // site content and navigation
   "page": 2,
   "pages": [{
      "number": 0,
      "title": "Consent Form",
      "template": "consent-form"
   }, {
      "number": 1,
      "title": "Create temporary Wunderlist account",
      "template": "wunderlist-account"
   }, {
      "number": 2,
      "title": "Set up experiment",
      "template": "experiment-setup"
   }, {
      "number": 3,
      "title": "Do the experiment",
      "template": "experiment"
   }, {
      "number": 4,
      "title": "Short questionnaire",
      "template": "questionnaire"
   }, {
      "number": 5,
      "title": "Get base reward + performance bonus",
      "template": "reward"
   }],

   // display variables
   "consentGiven": false,
   "experimentCheckClicked": false,
   "experimentCompleted": false,
   "bonus": 0
}

state.computeCurrentBonus = function() {
   state.firebase.child('/trials').once("value", state.computeCurrentBonusFromTrials)
}

// compute the number of successful trials
state.computeCurrentBonusFromTrials = function(trialsSnapshot) {
   state.bonus = 0;

   trialsSnapshot.forEach(function(trialSnapshot) {
      var trial = trialSnapshot.val();
      if (trial.success)
         state.bonus += state.bonusPerTrial;
   })

   console.log("bonus from trials", state.bonus);
}
