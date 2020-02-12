import * as firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAwsDpMtfKJvaLq0wXA5w9sDcTEtOZVQLA",
  authDomain: "cars-web-dev-test-1ae04.firebaseapp.com",
  databaseURL: "https://cars-web-dev-test-1ae04.firebaseio.com",
  projectId: "cars-web-dev-test-1ae04",
  storageBucket: "cars-web-dev-test-1ae04.appspot.com",
  messagingSenderId: "367219909113",
  appId: "1:367219909113:web:fe89ac99bd2748489d5d28"
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });
