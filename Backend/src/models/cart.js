import { timeStamp } from "console";
import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    categoryName: {
      type: String,
    },
    description: {
      type: String,
    },
    discount: {
      type: String,
    },
    duration: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    name: {
      type: String,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    providerName: {
      type: String,
    },

    model: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
