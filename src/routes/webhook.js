const express = require("express");
const router = express.Router();

const { imageProcessingWebhook } = require("../controllers/webhook");

// webhook route
router.post("/image-processing", imageProcessingWebhook);

module.exports = router;
