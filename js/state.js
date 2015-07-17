var state = {
   // setup

   "serverURL": "localhost:8888",
   //"serverURL": "tequila.cs.ubc.ca/stencil",
   "bonusPerTrial": 0.05,
   "bonusPerTab": 0.03,
   "bonusPerOption": 0.03,
   "numberOfTrials": 41,
   "bookmarkletCode": "",
   "email": "lotaculi",
   //"email": "",
   "firebase": "",
   "condition": "",
   "urlParams": {},

   // site content and navigation
   "page": 0,
   //"page": 0,
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
      "title": "Questionnaire (1)",
      "template": "questionnaire-recognition"
   }, {
      "number": 5,
      "title": "Questionnaire (2)",
      "template": "questionnaire-preference"
   }, {
      "number": 6,
      "title": "Questionnaire (3)",
      "template": "questionnaire-demographics"
   }, {
      "number": 7,
      "title": "Done !",
      "template": "done"
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
      if (trial.number > 0 && trial.success)
         state.bonus += state.bonusPerTrial;
   })

   console.log("bonus from trials", state.bonus);
}
