import * as Yup from "yup";

export const carSchema = Yup.object().shape({
  make: Yup.string()
    .min(3, "Car make too short")
    .max(30, "Car make too long")
    .required("Car make is a required field"),
  model: Yup.string()
    .min(3, "Car model too short")
    .max(30, "Car model too long")
    .required("Car model is a required field"),
  colour: Yup.string()
    .min(3, "Car colour too short")
    .max(30, "Car colour too long")
    .required("Car colour is a required field"),
  year: Yup.number()
    .required()
    .min(1885, "First car was built in 1885")
    .max(parseInt(new Date().getFullYear().toString()))
});

export type Car = Yup.InferType<typeof carSchema>;

export const cars: Array<Car> = [
  { make: "GMC", model: "Sonoma", colour: "Orange", year: 2002 },
  { make: "Buick", model: "Regal", colour: "Maroon", year: 1998 },
  { make: "Land Rover", model: "Range Rover", colour: "Yellow", year: 2000 },
  { make: "Mercedes-Benz", model: "500SEL", colour: "Blue", year: 1993 },
  { make: "Subaru", model: "Justy", colour: "Teal", year: 1990 },
  { make: "Lexus", model: "IS", colour: "Pink", year: 2002 },
  { make: "Toyota", model: "Prius", colour: "Red", year: 2012 },
  { make: "Kia", model: "Sportage", colour: "Puce", year: 1996 },
  { make: "BMW", model: "M Roadster", colour: "Yellow", year: 2006 },
  { make: "GMC", model: "Yukon Denali", colour: "Blue", year: 2000 },
  { make: "GMC", model: "Suburban 2500", colour: "Puce", year: 1992 },
  { make: "Audi", model: "S4", colour: "Orange", year: 1993 },
  { make: "BMW", model: "X6 M", colour: "Orange", year: 2013 },
  { make: "Chevrolet", model: "Corsica", colour: "Red", year: 1993 },
  { make: "GMC", model: "Safari", colour: "Red", year: 1996 },
  { make: "Saturn", model: "Astra", colour: "Red", year: 2009 },
  { make: "Kia", model: "Carens", colour: "Turquoise", year: 2008 },
  { make: "GMC", model: "Savana 3500", colour: "Crimson", year: 1998 },
  { make: "Dodge", model: "Ram 1500", colour: "Orange", year: 1995 },
  { make: "Mercury", model: "Villager", colour: "Turquoise", year: 1996 },
  { make: "Honda", model: "Odyssey", colour: "Orange", year: 1999 },
  { make: "GMC", model: "Terrain", colour: "Green", year: 2011 },
  { make: "Oldsmobile", model: "Intrigue", colour: "Purple", year: 2001 },
  { make: "Volkswagen", model: "Jetta", colour: "Red", year: 2007 },
  { make: "Dodge", model: "Ram 3500", colour: "Turquoise", year: 2006 },
  { make: "Hyundai", model: "Accent", colour: "Crimson", year: 1999 },
  { make: "Oldsmobile", model: "Toronado", colour: "Aquamarine", year: 1966 },
  { make: "Jaguar", model: "XK", colour: "Teal", year: 2010 },
  { make: "Pontiac", model: "Grand Prix", colour: "Turquoise", year: 1969 },
  { make: "Audi", model: "R8", colour: "Puce", year: 2008 }
];

export default cars;
