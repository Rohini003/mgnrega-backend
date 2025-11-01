import mongoose from "mongoose";

const districtPerformanceSchema = new mongoose.Schema({
  FinYear: String,
  Month: String,
  StateName: String,
  DistrictName: String,
  ApprovedLabourBudget: Number,
  AverageWageRatePerDay: Number,
  AverageDaysOfEmployment: Number,
  DifferentlyAbledPersonsWorked: Number,
  MaterialAndSkilledWages: Number,
  CompletedWorks: Number,
  OngoingWorks: Number,
  TotalExp: Number,
  TotalHouseholdsWorked: Number,
  TotalIndividualsWorked: Number,
  TotalActiveWorkers: Number,
  Wages: Number,
  WomenPersondays: Number,
}, { timestamps: true });

export default mongoose.model("DistrictPerformance", districtPerformanceSchema);
