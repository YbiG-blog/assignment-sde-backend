const streamifier = require("streamifier");
const csv = require("csv-parser");

/**
 *
 * @param {Object} file - File object
 * @returns {Promise} - Returns a promise
 * @description Parses the CSV file
 *
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
        resolve(results);
      })
      .on("error", (error) => {
        logError("Error processing CSV file:", error);
        reject(error);
      });
  });
};

module.exports = { csvParser };
