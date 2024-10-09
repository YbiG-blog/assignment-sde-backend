const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });
    logInfo("MongoDB connected successfully");
  } catch (err) {
    logError(err);
  }
};

module.exports = { connectDB };
