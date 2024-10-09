const { Product, File } = require("../models/index");
const { generateUniqueId } = require("../utils/product");
const { compressImage } = require("../services/sharp");
const { uploadFileToS3Bucket } = require("../services/s3Bucket");

/**
 *
 * @param parsedData - Parsed CSV data
 * @param fileName - File name
 * @returns {Promise<*>}
 * @description Process the CSV data
 *
 */
const processCSV = async (parsedData, fileName) => {
  // Step : 1 - Generate a unique request ID
  const requestId = await generateUniqueId();

  // Step : 2 - Crea File entry in the database
  const file = await new File({
    fileName,
    requestId,
  }).save();

  // Step : 3 - Prepare the product data
  const products = parsedData.map((item) => ({
    serialNumber: item.serialNumber,
    inputImageUrls: item.inputImageUrls.split(",").map((url) => url.trim()),
  }));

  // Step : 4 - Compress the images
  const compressedImageBuffer = await Promise.all(
    products?.map(async (product) => {
      const imageUrls = product.inputImageUrls;
      const compressedImages = imageUrls.map(async (imageUrl) => {
        return compressImage(imageUrl);
      });
      const result = await Promise.all(compressedImages);
      return { serialNumber: product.serialNumber, compressedImages: result };
    })
  );

  // // Step : 5 Upload the compressed images to AWS - S3
  const uploadedImageUrls = await Promise.all(
    compressedImageBuffer?.map(async (product) => {
      const compressedImages = product.compressedImages;
      const uploadedImages = compressedImages.map(async (image) => {
        return uploadFileToS3Bucket(fileName, image, "image/jpeg");
      });
      const result = await Promise.all(uploadedImages);
      return { serialNumber: product.serialNumber, uploadedImages: result };
    })
  );

  // // Step : 6 - Update the product status to completed
  const updatedProducts = parsedData.map((product, idx) => {
    const uploadedImages = uploadedImageUrls.find(
      (item) => item.serialNumber === product.serialNumber
    );
    return {
      ...product,
      outputImageUrls: uploadedImages?.uploadedImages?.join(","),
      fileId: file._id,
    };
  });
  // Step : 7 - Save the updated products to the database
  const saveData = await Product.insertMany(updatedProducts);

  // Step : 8 - Update the file status to completed
  await File.findByIdAndUpdate(
    { _id: file._id },
    { status: "completed", products: saveData.map((item) => item._id) }
  );

  return requestId;
};

module.exports = { processCSV };
