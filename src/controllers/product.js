// models
const { File } = require("../models/index");
// service
const { processCSV } = require("../services/product");
// utils
const { responseMessage, responseTemplate } = require("../utils/response");
const { csvParser } = require("../utils/csvParser");
const { productFileType } = require("../utils/constant");
// validators
const { uploadSchema } = require("../validators/joi");

/**
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 * @description Uploads a CSV file
 *
 */
const uploadCSV = async (req, res) => {
  try {
    const file = req.file;

    // Step : 1 - Check if the file is a CSV
    if (!file || !productFileType.product.includes(file.mimetype)) {
      return res
        .status(400)
        .json(
          await responseTemplate(
            false,
            !file ? responseMessage.noFile : "Only CSV file is allowed"
          )
        );
    }
    // Step : 2 - Parse the CSV file
    const parsedData = await csvParser(file);
    await uploadSchema.validateAsync(parsedData);

    // Step : 3 - Process the CSV data
    const fileName = `${Date.now()}_upload`;
    const requestId = await processCSV(parsedData, fileName);

    // Step : 4 - Send the response
    const response = {
      success: true,
      message: "CSV file uploaded successfully",
      data: { request_id: requestId },
    };
    return res.status(201).json(response);
  } catch (error) {
    logError(error);
    if (error?.isJoi) {
      return res.status(400).json(
        await responseTemplate(
          false,
          "Validation error",
          null,
          error?.details?.map((detail) => detail?.message)
        )
      );
    }
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, error)
      );
  }
};

/**
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 * @description Fetches the status of the file
 *
 */
const getStatus = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Step : 1 - Fetch the request status
    const file = await File.findOne({ requestId }, { status: 1 });

    // Step : 2 - Check if the file exists
    if (!file) {
      return res
        .status(404)
        .json(await responseTemplate(false, responseMessage.noDataFound));
    }
    // Step : 3 - Send the response
    const response = {
      success: true,
      message: "Request status fetched successfully",
      data: { status: file?.status },
    };
    return res.status(200).json(response);
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, error)
      );
  }
};

/**
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 * @description Fetches the file data
 *
 */
const getFileData = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Step : 1 - Fetch the request data
    const file = await File.findOne({ requestId }).populate({
      path: "products",
      select: {
        serialNumber: 1,
        outputImageUrls: 1,
        inputImageUrls: 1,
        productName: 1,
      },
    });

    // Step : 2 - Check if the file exists
    if (!file) {
      return res
        .status(404)
        .json(await responseTemplate(false, responseMessage.noDataFound));
    }
    // Step : 3 - Send the response
    const response = {
      success: true,
      message: "Request data fetched successfully",
      data: file,
    };
    return res.status(200).json(response);
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, error)
      );
  }
};

module.exports = { uploadCSV, getStatus, getFileData };
