import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {

        fullname: {
            type: String,
            required: [true, "Please enter your Fullname."]
        },
        email: {
            type: String,
            required: [true, "Please enter your Email."]
        },
        phone: {
            type: String,
            required: [true, "Please enter your Phone number."]
        },
        password: {
            type: String,
            required: [true, "Please enter your Password."]
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    })

export const User = mongoose.model("User", schema)


