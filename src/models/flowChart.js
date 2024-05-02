import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Send Email", "Wait", "Decision"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Node = mongoose.model("Node", nodeSchema);
