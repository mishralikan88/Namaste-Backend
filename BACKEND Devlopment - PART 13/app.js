import express from "express";
import userRouter from "./routes/user.js"; // importing the user router
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/task.js";

const app = express(); // creating app server

config({
  path: "./data/config.env",
});

connectDB(); // DB Connectivity

app.use(express.json()); // Using JSON middleware to parse request bodies for POST requests; place this before defining routes.

app.use(cookieParser());

app.use("/users", userRouter); // Using userRouter with "/users" as the route prefix; full URL path flow: app.js → routes → controller


app.use("/tasks", taskrouter); // Using taskrouter with "/tasks" as the route prefix; full URL path flow: app.js → routes → controller


app.get("/", (req, res) => {
  // default localhost URL
  res.send("Nice working ");
});

app.listen(process.env.PORT, () => console.log("server is working")); // Server listening at port 4000
