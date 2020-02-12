const admin = require("firebase-admin");

export default (req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(404);
  }
  const { query } = req;
  const cars = [];
  if (query.make || query.model) {
    admin
      .firestore()
      .collection("cars")
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
        }
      });
  } else {
    admin
      .firestore()
      .collection("cars")
      .get(snapshot => {
        if (snapshot.size > 0) {
          snapshot.docs.map(doc => cars.push(doc.data()));
        }
      });
  }
};
