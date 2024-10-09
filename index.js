require("dotenv").config();

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const { logger, logError, logInfo } = require("./src/config/winston");

// connect to db
const { connectDB } = require("./src/config/db");
connectDB();

const { PORT } = process.env;

const app = express();

logger.stream = {
  write(message, encoding) {
    logger.error(message);
  },
};
global.logger = logger;
global.logError = logError;
global.logInfo = logInfo;

app.use(
  morgan("tiny", {
    stream: logger.stream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Apis working are working." });
});

// routes
app.use("/api/v1", require("./src/routes"));

app.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
});
