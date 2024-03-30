import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
    price: {
      type: Number,
    },
    user: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
    },

    provider: {
      type: String,
    },
    model: {
      type: String,
    },
    order_id: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
      default: null,
    },
    razorpay_order_id: {
      type: String,
      default: null,
    },
    razorpay_signature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("Order", orderSchema);
