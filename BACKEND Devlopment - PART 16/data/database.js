import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendAPI",
    })
    .then((c) => {
      console.log(`DB connected with ${c.connection.host}`); // connected to DB hosted in the Mongo DB clusture online.
    })
    .catch((err) => console.log(err));
};
