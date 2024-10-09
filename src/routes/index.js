const express = require("express");
const router = express.Router();

const productRoutes = require("./product");
const webhookRoutes = require("./webhook");

router.use("/file", productRoutes);
router.use("/webhook", webhookRoutes);

module.exports = router;
