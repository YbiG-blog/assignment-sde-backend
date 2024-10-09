const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    fileName: { type: String, required: true },
    requestId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
