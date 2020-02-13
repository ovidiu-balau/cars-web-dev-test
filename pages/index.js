import React, { FunctionComponent } from "react";
import { firestore } from "../creds/client.js";
import FormikForm from "../components/FormikForm.js";
import { cars, carSchema } from "../creds/data";
import axios from "axios";
// import Car from "../components/Car.js";

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

const Car = ({ car }) => (
  <div>
    <p>
      {car.year} {car.make} {car.model}
    </p>
    <p style={{ marginTop: -20, fontSize: 12 }}>{car.colour}</p>
  </div>
);

export default class Index extends React.Component {
  state = {
    cars: null
  };

  componentDidMount() {
    this.handleFetchCars();
  }

  handleFetchCars = () => {
    axios.get("http://localhost:3000/api/cars/get").then(res => {
      if (res.data) {
        this.setState({ cars: res.data });
      }
    });
  };

  handleAddCar = (values, actions) => {
    axios
      .post("http://localhost:3000/api/cars/create", values)
      .then(() => actions.resetForm())
      .catch(err => console.error(err));
  };

  handleResetCarStock = () => {
    cars.length > 0 && cars.map(car => firestore.collection("cars").add(car));
  };

  render() {
    const { cars } = this.state;
    return (
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          <div className="col-md-8">
            <h1>Cars web dev test</h1>
            <button className="btn btn-primary" onClick={this.handleFetchCars}>
              Fetch cars
            </button>
            <button
              className="btn btn-warning"
              style={{ marginLeft: 10 }}
              onClick={this.handleResetCarStock}
            >
              Add all cars from file
            </button>

            {cars && (
              <div className="row">
                <div className="col-md-12" style={{ marginTop: 20 }}>
                  <p>
                    <strong>{cars.length} cars</strong>
                  </p>
                  {cars.map(car => (
                    <Car car={car} key={car.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4">
            <FormikForm
              formTitle="Create car"
              fields={carFields}
              validationSchema={carSchema}
              handleSubmit={this.handleAddCar}
              initialValues={{
                make: "",
                model: "",
                colour: "",
                year: 2020
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
