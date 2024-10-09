const sharp = require("sharp");
const axios = require("axios");
const { logError } = require("../config/winston");

const compressImage = async (imageUrl) => {
  try {
    // Step : 1 - Fetch the image
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });

    // Step : 2 - Compress the image
    const imageBuffer = Buffer.from(response.data, "binary");

    // Step : 3 - Compress the image
    const compressedImage = await sharp(imageBuffer, { failOnError: false })
      .jpeg({ quality: 50 })
      .toBuffer();

    return compressedImage;
  } catch (error) {
    logError("Error compressing image", error);
    return null;
  }
};

module.exports = { compressImage };
