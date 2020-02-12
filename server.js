const next = require("next");
const admin = require("firebase-admin");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

var serviceAccount = require("./creds/firebase.json");

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount)
  },
  "server"
);

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    req.firebaseServer = firebase;
    next();
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
