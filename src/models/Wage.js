// CommonJS style (matches your server.js)
const mongoose = require('mongoose');

const WageSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  wage: { type: Number, required: true },        // ₹ per day
  source: { type: String },                      // optional source text
  lastUpdated: { type: Date, default: Date.now } // when this record was fetched/seeded
});

module.exports = mongoose.model('Wage', WageSchema);
