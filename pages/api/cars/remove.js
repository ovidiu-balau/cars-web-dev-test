const admin = require("firebase-admin");

export default (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      admin
        .firestore()
        .collection("cars")
        .doc(id)
        .delete()
        .then(() => {
          res.json({
            status: "success",
            message: "Car removed successfully",
            data: id
          });
        })
        .catch(err =>
          res.status(500).json({
            status: "error",
            message: err.message,
            data: id
          })
        );
    } else {
      res.status(422).json({
        status: "error",
        message: "Invalid request data",
        data: id
      });
    }
  } else {
    res.sendStatus(404);
  }
};
