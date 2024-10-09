const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    serialNumber: { type: Number, required: true },
    productName: { type: String, required: true },
    inputImageUrls: { type: String, required: true },
    outputImageUrls: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
