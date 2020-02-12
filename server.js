const next = require("next");
const admin = require("firebase-admin");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

var serviceAccount = require("./creds/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cars-web-dev-test-1ae04.firebaseio.com"
});
