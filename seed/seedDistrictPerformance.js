import mongoose from "mongoose";
import dotenv from "dotenv";
import csv from "csvtojson";
import DistrictPerformance from "../src/models/DistrictPerformance.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mgnrega";

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const csvFilePath = "./data/district_performance.csv";
    const jsonArray = await csv().fromFile(csvFilePath);

    console.log(`Total records found in CSV: ${jsonArray.length}`);

    await DistrictPerformance.deleteMany();
    await DistrictPerformance.insertMany(jsonArray);

    console.log(" Data imported successfully!");
    process.exit();
  } catch (error) {
    console.error(" Error importing CSV:", error);
    process.exit(1);
  }
}

seedData();
