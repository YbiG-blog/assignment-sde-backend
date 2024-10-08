const streamifier = require("streamifier");
const csv = require("csv-parser");
const { Buffer } = require("safe-buffer");
const { logInfo } = require("../config/winston");

/**
 * Parses the uploaded CSV file
 * @param fileData - CSV file data
 * @returns {Promise<Array>} - Parsed CSV rows
 */

const csvParser = async (file) => {
  return new Promise((resolve, reject) => {
    const results = [];

    streamifier
      .createReadStream(file.buffer)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        logInfo(results); // parsed CSV rowsx
        resolve(results);
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
        reject(error);
      });
  });
};

module.exports = { csvParser };
