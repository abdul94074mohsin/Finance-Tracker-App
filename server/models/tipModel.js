import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["tip", "news"],
      default: "tip"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tip", tipSchema);
