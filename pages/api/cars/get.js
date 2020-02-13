const admin = require("firebase-admin");
const axios = require("axios");

const datamuseAPI = "https://api.datamuse.com/words?sl=";

export default async (req, res) => {
  if (req.method !== "GET") {
    res.sendStatus(404);
  }

  const { id } = req.query;

  if (id) {
    admin
      .firestore()
      .collection("cars")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const car = doc.data();
          car.id = doc.id;
          axios
            .get(`${datamuseAPI}${car.model}`)
            .then(result => {
              car.soundAlike = "";
              result.data.map((foundWord, i) => {
                if (i < 10) {
                  car.soundAlike += foundWord.word + (i != 9 ? " " : "");
                }
              });
              res.send(car);
            })
            .catch(() => {
              res.send(car);
            });
        } else {
          res.status(404).json({
            message: "No ID found",
            data: id
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          status: "error",
          message: err.message,
          data: req.body
        });
      });
  } else {
    const cars = [];
    admin
      .firestore()
      .collection("cars")
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.docs.map(doc => {
            const car = doc.data();
            car.id = doc.id;
            cars.push(car);
          });
          res.send(cars);
        } else {
          res.json({ data: [] });
        }
      });
  }
};
