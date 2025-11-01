import mongoose from "mongoose";
import dotenv from "dotenv";
import { fetchMgnregaData } from "../services/mgnregaClient.js";
import MgnregaMonthly from "../models/MgnregaMonthly.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

const runETL = async () => {
  await connectDB();
  console.log("⏳ Fetching MGNREGA data...");
  const data = await fetchMgnregaData(1000);

  await MgnregaMonthly.deleteMany(); // clear old cache
  await MgnregaMonthly.insertMany(data.map(item => ({
    finYear: item["Fin Year"],
    month: item["Month"],
    stateName: item["State Name"],
    districtName: item["District Name"],
    approvedLabourBudget: item["Approved Labour Budget"],
    totalExp: item["Total Exp"],
    averageWageRatePerDayPerPerson: item["Average Wage Rate Per Day Per Person"],
    totalHouseholdsWorked: item["Total Households Worked"],
    totalIndividualsWorked: item["Total Individuals Worked"],
    wages: item["Wages"],
    womenPersondays: item["Women Persondays"],
  })));

  console.log("ETL complete! Data saved to MongoDB.");
  process.exit();
};

runETL();
