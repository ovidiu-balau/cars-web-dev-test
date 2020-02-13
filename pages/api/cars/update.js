const admin = require("firebase-admin");
const Joi = require("@hapi/joi");

const carSchemaServer = Joi.object().keys({
  make: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .optional(),
  model: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .optional(),
  colour: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .optional(),
  year: Joi.number()
    .integer()
    .min(1885)
    .max(2021)
    .optional()
});

export default (req, res) => {
  if (req.method === "POST") {
    const { id, car } = req.body;
    if (id && car) {
      const { error, value } = carSchemaServer.validate(car);
      if (error) {
        res.status(422).json({
          status: "error",
          message: error.details,
          data: req.body
        });
      } else {
        admin
          .firestore()
          .collection("cars")
          .doc(id)
          .set(car, { merge: true })
          .then(snap => {
            const carValue = value;
            carValue.id = snap.id;
            res.json({
              status: "success",
              message: "Car modified successfully",
              data: carValue
            });
          })
          .catch(err =>
            res.status(500).json({
              status: "error",
              message: err.message,
              data: req.body
            })
          );
      }
    } else {
      res.status(422).json({
        status: "error",
        message: "Invalid request data",
        data: car
      });
    }
  } else {
    res.sendStatus(404);
  }
};
