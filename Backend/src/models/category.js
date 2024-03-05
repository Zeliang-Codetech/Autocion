import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  status: {
    type: String,
    enum: ["Enabled", "Disabled"],
    default: "Enabled",
  },
});

export const Category = mongoose.model("Category", categorySchema);
