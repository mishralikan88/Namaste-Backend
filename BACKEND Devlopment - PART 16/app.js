import express from "express";
import userRouter from "./routes/user.js"; // importing the user router
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/task.js";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

const app = express();

config({
  path: "./data/config.env",
});

connectDB();

app.use(express.json());

app.use(cookieParser());

// CORS stands for Cross Origin Resource sharing meaning CORS  allow resources sharing between cross origins.
// Cross Origins means different domains such as front-end domain as request URL PATH and backend domain as API URL PATH.
// If there is a mismatch between these paths then CORS will come to the picture unless no need of configuring CORS protocol.
// Server should allow requests based on CORS configuration.
// CORS is a set of rules which both server and frontend should obey for security.
// CORS enables a server to accept request only from configured domains from frontend-Client which means our server should receive requests from specific domains from UI frontend.
// CORS can also configure the request type meaning what type of request server will accept from the frontend UI like GET, POST, PUT and  DELETE.

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Client will not receive any headers (cookie and other headers) from the server
  })
);

app.use("/users", userRouter);

app.use("/tasks", taskrouter);

app.get("/", (req, res) => {
  res.send("Nice working ");
});

app.listen(process.env.PORT, () => console.log(`server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode `));

// using error middleware
app.use(errorMiddleWare);
