var state = {
   // setup
   "serverURL": "localhost:8888",
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
   "installationCode": "",
   "installationSuccess": false
}
