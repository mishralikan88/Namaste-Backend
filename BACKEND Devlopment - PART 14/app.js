import express from "express";
import userRouter from "./routes/user.js"; // importing the user router
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/task.js";
import { errorMiddleWare } from "./middlewares/error.js";

const app = express();

config({
  path: "./data/config.env",
});

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use("/users", userRouter);

app.use("/tasks", taskrouter);

app.get("/", (req, res) => {
  res.send("Nice working ");
});

app.listen(process.env.PORT, () => console.log("server is working"));

app.use(errorMiddleWare); // using error middleware

// app.use(errorMiddleWare) must be placed last so it can catch errors from all preceding routes and middleware.
