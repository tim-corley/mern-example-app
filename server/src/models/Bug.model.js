import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    platform: { type: String, required: true },
    severity: { type: Number, required: true },
    realseBlocker: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;
