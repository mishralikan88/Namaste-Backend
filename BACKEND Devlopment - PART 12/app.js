import express from "express";
import userRouter from "./routes/user.js"; // importing the user router
import { connectDB } from "./data/database.js";
import { config } from "dotenv";

const app = express(); // creating app server

config({
  path: "./data/config.env",
});

connectDB(); // DB Connectivity

app.use(express.json()); // using JSON middle ware to allow post requests

app.use("/users", userRouter); //  using user router. setting up routing prefix for user route  as "/users"

app.get("/", (req, res) => {
  // default localhost URL
  res.send("Nice working ");
});

app.listen(process.env.PORT, () => console.log("server is working")); // Server listening at port 4000
