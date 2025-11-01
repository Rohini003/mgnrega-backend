// controllers/performanceController.js
const axios = require("axios");

const getDistrictPerformance = async (req, res) => {
  const { district } = req.query; // optional filter
  const API_KEY = process.env.API_KEY;
  const RESOURCE_ID = process.env.RESOURCE_ID;

  try {
    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=100`;
    const response = await axios.get(url);
    const records = response.data.records;

    // optionally filter by district if provided
    const filtered =
      district && district !== "all"
        ? records.filter(
            (r) =>
              r.district_name &&
              r.district_name.toLowerCase() === district.toLowerCase()
          )
        : records;

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching MGNREGA data:", error);
    res.status(500).json({ message: "Error fetching performance data" });
  }
};

module.exports = { getDistrictPerformance };
