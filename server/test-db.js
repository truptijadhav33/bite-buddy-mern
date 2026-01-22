require('dotenv').config();
const mongoose = require('mongoose');

console.log("Testing URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ SUCCESS: Connected to Atlas!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ FAILED:", err.message);
    process.exit(1);
  });