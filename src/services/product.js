const { csvParser } = require("../utils/csvParser");

/**
 * Processes the uploaded CSV file
 * @param file - Uploaded CSV file
 * @returns {Promise<string>} - Unique request ID
 */
const processCSV = async (file) => {
  await csvParser(file);
  return " 123";
};

module.exports = { processCSV };
