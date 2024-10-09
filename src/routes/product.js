const express = require("express");
const router = express.Router();

const { uploadCSV, getStatus, getFileData } = require("../controllers/product");

const { upload } = require("../middlewares/multer");

// add upload middleware
router.post("/upload", upload.single("file"), uploadCSV);

router.get("/status/:requestId", getStatus);
router.get("/get-file-data/:requestId", getFileData);


module.exports = router;
