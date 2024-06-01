import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your Fullname."],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email."],
    },
    phone: {
      type: String,
      required: [true, "Please enter your Phone number."],
    },
    password: {
      type: String,
      required: [true, "Please enter your Password."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
    },
    address: {
      addressName: { type: String },
      alternatePhone: { type: String },
      pincode: { type: String },
      houseNo: { type: String },
      area: { type: String },
      landmark: { type: String },
      city: { type: String },
      state: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
