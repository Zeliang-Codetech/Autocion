import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  image: { type: String },
});
export const Model = mongoose.model("Model", modelSchema);
