import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  districtName: { type: String, required: true },
  stateName: { type: String },
});

export default mongoose.model("District", districtSchema);
