const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    serialNumber: { type: Number, required: true },
    productName: { type: String, required: true },
    inputImageUrls: { type: String, required: true },
    outputImageUrls: { type: String }, // Output image URL after processing
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    requestId: { type: String, required: true, unique: true }, // Unique request ID to track the product processing
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
