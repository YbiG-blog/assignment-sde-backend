const express = require("express");
const router = express.Router();

const { uploadCSV } = require("../controllers/product");

const { upload } = require("../middlewares/multer");

// add file upload middleware
router.post("/upload", upload.single("file"), uploadCSV);

module.exports = router;
