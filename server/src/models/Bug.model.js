import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    platform: { type: String, required: false },
    severity: { type: Number, required: false },
    releaseBlocker: { type: Boolean, required: false },
  },
  { timestamps: true }
);

export const Bug = mongoose.model("Bug", bugSchema);
