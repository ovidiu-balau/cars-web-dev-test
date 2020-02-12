import React from "react";
import { firestore } from "../creds/firebase.js";
import FormikForm from "../components/FormikForm.js";
import { cars, carSchema } from "../creds/data.ts";

const carFields = [
  {
    name: "make",
    label: "Make"
  },
  {
    name: "model",
    label: "Model"
  },
  {
    name: "colour",
    label: "Colour"
  },
  {
    name: "year",
    label: "Year"
  }
];

export default class Index extends React.Component {
  state = {
    cars: null
  };

  handleFetchCars = () => {};

  handleAddCar = (actions, values) => {};

  handleDeleteCars = () => {
    firestore
      .collection("cars")
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          snapshot.docs.map(doc => doc.delete());
        }
      });
  };

  handleResetCarStock = () => {
    cars.length > 0 && cars.map(car => firestore.collection("cars").add(car));
  };

  render() {
    return (
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          <div className="col-md-8">
            <h1>Cars web dev test</h1>
            <button className="btn btn-primary" onClick={this.handleFetchCars}>
              Fetch cars
            </button>
            <button
              className="btn btn-danger"
              onClick={this.handleDeleteCars}
              style={{ marginLeft: 10 }}
            >
              Delete all cars
            </button>
            <button
              className="btn btn-warning"
              style={{ marginLeft: 10 }}
              onClick={this.handleResetCarStock}
            >
              Reset car stock
            </button>
          </div>
          <div className="col-md-4">
            <FormikForm
              formTitle="Create car"
              fields={carFields}
              validationSchema={carSchema}
              handleSubmit={this.handleAddCar}
              initialValues={{}}
            />
          </div>
        </div>
      </div>
    );
  }
}
