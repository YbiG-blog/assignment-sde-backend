const randomstring = require("randomstring");
const { Product } = require("../models/index");

/**
 * The function `generateUniqueId ` generates a requestId by checking if it already exists in the database
 * and generating a new one if necessary.
 * @returns The function `generateUniqueId ` returns a requestId that does not already exist in the
 * database.
 */
const generateUniqueId = async () => {
  let requestId = randomstring.generate(12);

  // check if requestId already exists in database
  let count = await Product.findOne({ requestId });

  // if count is not null, then requestId already exists in database
  while (count) {
    requestId = randomstring.generate(14); // generate a new requestId
    count = await Product.findOne({ requestId });
  }

  return requestId;
};

module.exports = { generateUniqueId };
