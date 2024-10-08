require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Api working are working." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
