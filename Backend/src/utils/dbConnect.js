import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    // .connect(process.env.MONGO_URI, {
    //   dbName: "Autocion",
    // })
      .connect("mongodb+srv://zeliangcodetech:codetech123@cluster0.szo31wo.mongodb.net/Autocion", {
      dbName: "Autocion",
    })
    .then((connect) =>
      console.log(`DB Connected to ${connect.connection.host}`)
    )
    .catch((e) => console.log(e));
};
// "mongodb://localhost:27017/"
