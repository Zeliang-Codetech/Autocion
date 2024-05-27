import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "model",
  },
  name: { type: String },
  tags: { type: String },
  description: { type: String },
  image: { type: String },

  duration: { type: String },
  members: { type: String },

  tax: {
    type: String,
    enum: ["TaxExcluded", "TaxIncluded"],
    default: "TaxIncluded",
  },
  taxPercent: {
    type: String,
    enum: ["5", "9", "12", "18", "28"],
  },
  price: { type: String },
  discount: { type: String },

  serviceOption: {
    cancelable: { type: String },
    payLater: { type: String },
  },
  status: { type: String, enum: ["Active", "Unactive"], default: "Unactive" },
});

export const Service = mongoose.model("Service", serviceSchema);
