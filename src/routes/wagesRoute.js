// backend/src/routes/wagesRoute.js
const express = require("express");
const router = express.Router();
const Wage = require("../models/Wage");
const { fetchMgnregaData } = require("../services/mgnregaClient");

// GET /api/wages
router.get("/", async (req, res) => {
  try {
    console.log("🔄 Attempting to fetch live MGNREGA data...");
    const apiData = await fetchMgnregaData(100);

    if (apiData.length > 0) {
      // Transform live API data to match Wage model
      const transformed = apiData.map((item) => ({
        state: item["State Name"] || "Unknown",
        district: item["District Name"] || "Unknown",
        wage: Number(item["Average Wage Rate Per Day Per Person"]) || 0,
        source: "Govt API",
        lastUpdated: new Date(),
      }));

      // Replace old records (optional)
      await Wage.deleteMany({});
      await Wage.insertMany(transformed);

      console.log(`Saved ${transformed.length} records from live API`);
      return res.json({
        source: "Live API",
        count: transformed.length,
        data: transformed,
      });
    }

    // 🟡 Fallback if no API data
    console.warn("⚠️ Falling back to MongoDB backup data...");
    const backupData = await Wage.find().sort({ lastUpdated: -1 }).limit(200).lean();

    return res.json({
      source: "MongoDB Backup",
      count: backupData.length,
      data: backupData,
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({
      message: "Server error while fetching wages",
      error: err.message,
    });
  }
});

module.exports = router;
