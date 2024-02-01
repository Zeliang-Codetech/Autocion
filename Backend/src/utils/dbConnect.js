import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/", {
        dbName: "Autocion"
    }).then(connect => console.log(`DB Connected to ${connect.connection.host}`))
        .catch((e) => console.log(e))
}