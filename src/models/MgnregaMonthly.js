import mongoose from "mongoose";

const mgnregaMonthlySchema = new mongoose.Schema({
  finYear: String,
  month: String,
  stateName: String,
  districtName: String,
  approvedLabourBudget: Number,
  totalExp: Number,
  averageWageRatePerDayPerPerson: Number,
  totalHouseholdsWorked: Number,
  totalIndividualsWorked: Number,
  wages: Number,
  womenPersondays: Number,
  dateFetched: { type: Date, default: Date.now },
});

export default mongoose.model("MgnregaMonthly", mgnregaMonthlySchema);
