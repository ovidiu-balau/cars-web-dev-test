import React from "react";
import { firestore } from "../creds/firebase.js";
import FormikForm from "../components/FormikForm.js";

const carFields = [
  {
    name: ""
  }
];

export default class Index extends React.Component {
  state = {};

  handleFetchCars = () => {};

  handleAddCar = () => {};

  handleResetCars = () => {};

  render() {
    return (
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          <div className="col-md-8">
            <h1>Cars web dev test</h1>
            <button className="btn btn-primary" oNClick={this.handleFetchCars}>
              Fetch cars
            </button>
            <button className="btn btn-success" style={{ marginLeft: 10 }}>
              Add car
            </button>
            <button className="btn btn-danger" style={{ marginLeft: 10 }}>
              Reset cars
            </button>
          </div>
          <div className="col-md-4">
            <FormikForm fields={carFields} />
          </div>
        </div>
      </div>
    );
  }
}
