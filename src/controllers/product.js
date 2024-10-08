// service
const { processCSV } = require("../services/product");

// utils
const { responseMessage, responseTemplate } = require("../utils/response");

/**
 * Handles CSV upload and processing request
 * @param req - HTTP request
 * @param res - HTTP response
 */
const uploadCSV = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json(await responseTemplate(false, responseMessage.noFile));
    }
    const requestId = await processCSV(file);
    const response = {
      success: true,
      message: "CSV file uploaded successfully",
      requestId,
    };
    return res.status(201).json(response);
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, error)
      );
  }
};

module.exports = { uploadCSV };
