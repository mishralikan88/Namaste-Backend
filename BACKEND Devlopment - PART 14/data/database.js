import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendAPI",
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => console.log(err));
};
