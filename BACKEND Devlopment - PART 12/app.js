import express from "express";
import userRouter from "./routes/user.js"; // Importing the user router
import { connectDB } from "./data/database.js";
import { config } from "dotenv";

const app = express(); // creating app server

config({
  path: "./data/config.env",
});

connectDB(); // DB Connectivity

app.use(express.json()); // using JSON middleware  to allow post requests

app.use("/users", userRouter); // Mounts userRouter with "/users" as the route prefix.

app.get("/", (req, res) => {
  // default localhost URL
  res.send("Nice working ");
});

app.listen(process.env.PORT, () => console.log("server is working")); // Server listening at port 4000




// 1️⃣ What is a .env file? (D:\Backend\Namaste-Backend\BACKEND Devlopment - PART 12\data\config.env)

// .env file is just a text file that stores environment variables in KEY=VALUE format.

// PORT=4000
// MONGO_URI=mongodb://127.0.0.1:27017

// These values are not hardcoded into your JavaScript files , instead, they are loaded into process.env at runtime.






// 2️⃣ How your code uses it

// Step 1 - Import and configure dotenv

// import { config } from "dotenv";
// config({
//   path: "./data/config.env", // tells dotenv where your .env file is.This reads your .env file and adds its variables into the process.env object.
// });
// config → built-in function from dotenv that loads variables into process.env.
// config.env → your file that stores environment variables in KEY=VALUE format.


// Step 2 — Access values

// app.listen(process.env.PORT, () => console.log("server is working"));
// Here: process.env.PORT → looks inside the process.env object for a key called PORT.The value (4000) came from config.env.

// Step 3 — Database connection

// connectDB(); // This probably uses process.env.MONGO_URI internally.
// Inside your connectDB function, it’s likely doing:
// mongoose.connect(process.env.MONGO_URI); // Here, process.env.MONGO_URI came from: MONGO_URI=mongodb://127.0.0.1:27017


// 3️⃣ Why use .env?

// Keep sensitive info (like DB passwords) out of your code.
// Easy to change without touching code — just update .env.
// Different .env files for development, testing, production.

// 4️⃣ How it flows in your project ?

// config.env  → loaded by dotenv → stored in process.env → used in app.js & other files