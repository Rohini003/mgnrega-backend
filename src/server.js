// Load environment variables
require("dotenv").config({ path: "../" });

const mongoose = require("mongoose");
const app = require("./app"); // Import Express app

//  MongoDB connection using environment variable or fallback
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

// Test environment variables
console.log(" API_KEY:", process.env.API_KEY ? "Loaded " : "Missing ");
console.log("RESOURCE_ID:", process.env.RESOURCE_ID ? "Loaded " : "Missing");

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
