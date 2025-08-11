import express from "express";
import userRouter from "./routes/user.js";
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


app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users", userRouter);

app.use("/tasks", taskrouter);

app.get("/", (req, res) => {
  res.send("Nice working ");
});

app.listen(process.env.PORT, () => console.log(`server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode `));

// using error-middleware
app.use(errorMiddleWare);



// =====================================================================================================================


// Imagine -
// Frontend: https://shop-frontend.com
// Backend API: https://shop-backend.com/api

// Same origin :
// Two URLs are same origin only if protocol, domain, and port are the same.
// Here, they’re different domains (shop-frontend.com vs shop-backend.com) → cross-origin.

// What happens without CORS : 
// Your React app at shop-frontend.com tries:
// GET https://shop-backend.com/api/products
// Browser says: "Hey backend, can I fetch this? We’re from a different origin."
// If the backend hasn’t enabled CORS for shop-frontend.com, the browser blocks the request — your JS never gets the data.

// What happens with CORS :
// Backend sets: 
// app.use(cors({
//   origin: "https://shop-frontend.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// Now browser says: "Backend allows this frontend. Let’s send the request and allow the response to be read."
// Once you enable CORS and allow the frontend's origin, the browser will let your frontend read the backend’s response.Before that, the browser was blocking it for security reasons.



// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );


// What methods means here ?
// It's the list of HTTP methods the backend allows the frontend to use.

// Common methods:
// GET → fetch data
// POST → send data
// PUT → update data
// DELETE → remove data
// Example: If you only allow ["GET"], and the frontend tries to POST, the browser will block it.


// credentials: true means:
// Browser is allowed to send cookies (like session IDs) with cross-origin requests.
// Browser is allowed to receive and use cookies or auth headers from the backend’s response.
// Without this, even if the backend sets a cookie, the browser won’t store it for cross-origin requests.
