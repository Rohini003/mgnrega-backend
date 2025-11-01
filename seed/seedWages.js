// seedWages.js
const mongoose = require("mongoose");
const Wage = require("../src/models/Wage");

mongoose.connect("mongodb://127.0.0.1:27017/mgnrega", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wagesData = [
  { state: "Maharashtra", district: "Pune", wage: 250, source: "Govt Data" },
  { state: "Maharashtra", district: "Nashik", wage: 245, source: "Govt Data" },
  { state: "Gujarat", district: "Ahmedabad", wage: 230, source: "Govt Data" },
  { state: "Rajasthan", district: "Jaipur", wage: 240, source: "Govt Data" },
  { state: "Madhya Pradesh", district: "Indore", wage: 220, source: "Govt Data" },
  { state: "Uttar Pradesh", district: "Lucknow", wage: 210, source: "Govt Data" },
];

async function seed() {
  try {
    await Wage.deleteMany({});
    await Wage.insertMany(wagesData);
    console.log("Sample wages inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
