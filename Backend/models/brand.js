import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: { type: String,required: true,unique: true },
    image:{type:String},
    mobile:{type:String},
    email:{type:String},
    status: {
        type: String,
        enum: ["Approved", "Pending", "Rejected"],
        default: "Pending",
      },
      

});

export const Brand = mongoose.model("Brand", brandSchema);
