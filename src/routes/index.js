const express = require("express");
const router = express.Router();

const productRoutes = require("./product");

router.use("/file", productRoutes);

module.exports = router;
