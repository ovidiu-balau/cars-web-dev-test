const admin = require("firebase-admin");
const Joi = require("@hapi/joi");

const carSchemaServer = Joi.object().keys({
  make: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required(),
  model: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required(),
  colour: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required(),
  year: Joi.number()
    .integer()
    .min(1885)
    .max(2021)
    .required()
});

export default (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const { error, value } = carSchemaServer.validate(req.body);
      if (error) {
        res.status(422).json({
          status: "error",
          message: error.details,
          data: req.body
        });
      }
      admin
        .firestore()
        .collection("cars")
        .add({
          ...value,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(snap => {
          const carValue = value;
          carValue.id = snap.id;
          res.json({
            status: "success",
            message: "Car added successfully",
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
