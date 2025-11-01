// services/mgnregaPerformanceClient.js
const axios = require("axios");
require("dotenv").config();

const BASE_URL = "https://api.data.gov.in/resource";

const fetchPerformanceData = async () => {
  const { API_KEY, RESOURCE_ID } = process.env;
  try {
    const response = await axios.get(`${BASE_URL}/${RESOURCE_ID}`, {
      params: {
        "api-key": API_KEY,
        format: "json",
        limit: 1000,
      },
    });

    // Extract the records
    const data = response.data.records.map((item) => ({
      finYear: item["Fin Year"],
      month: item["Month"],
      state: item["State Name"],
      district: item["District Name"],
      totalWorkers: item["Total No Of Workers"],
      totalJobCards: item["Total No Of JobCards Issued"],
      totalHouseholdsWorked: item["Total Households Worked"],
      averageWageRate: item["Average Wage Rate Per Day Per Person"],
      totalExp: item["Total Exp"],
      womenPersondays: item["Women Persondays"],
      totalWorks: item["Total No Of Works Takenup"],
    }));

    return data;
  } catch (error) {
    console.error("Live API fetch failed:", error.message);
    throw new Error("Failed to fetch live data");
  }
};

module.exports = { fetchPerformanceData };
