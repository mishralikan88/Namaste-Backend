import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

// DB Connectivity
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

// Schema constructing
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// DB Model creating
const User = mongoose.model("User", userSchema);

// creating app server
const app = express();

// using static middleware
app.use(express.static(path.join(path.resolve(), "public")));

// using urlencoded middleware
app.use(express.urlencoded({ extended: true }));

// using cookie parser middle ware to receieve cookies from the client request
app.use(cookieParser());

// setting  project view engine
app.set("view engine", "ejs");


// Authentication handler or Authenticator middleware

const isAuthenticated = async (req, res, next) => { 
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token,"SecretKey")

    // We can use the same secret key during decoding (with jwt.verify()) that was used during encoding (with jwt.sign()), so that the server can verify the token’s authenticity and ensure it hasn’t been tampered with.

    // Never expose your secret key to the frontend.

    // If a hacker gets access to both the JWT token and the secret key, they can generate fake tokens and compromise your entire system.

    // Always store your secret key in a secure .env file and never commit it to Git — make sure to add .env to your .gitignore.

    req.user = await User.findById(decoded._id)
    next(); 
  } else {
    res.render("login"); 
  }
};    

// Authentication API Logic

app.get("/", isAuthenticated, (req, res) => { 
  console.log(req.user)
  res.render("logout",{name:req.user.name});
});

// login  routes configuration

// app.post("/login", async (req, res) => {
//   console.log(req.body)
//   const {name,email} = req.body
//   const user = await User.create({name,email})
//   console.log(user._id)

//   res.cookie("token", user._id, { // Shows db stored user id in the browser cookie . Less secure 
//     httpOnly: true,
//     expires: new Date(Date.now() + 60 * 1000),
//   });
//   res.redirect("/");
// });


// better security as we are using jwt .
app.post("/login", async (req, res) => {
  const {name,email} = req.body
  const user = await User.create({name,email})
  const token = jwt.sign({_id:user._id},"SecretKey") // 🔐 sign() accepts a payload (like { _id: user._id }, usually returned from the MongoDB user object) and a secret key as the second argument, which is used to sign and securely encode the token.
  console.log(`Token => ${token}`)


  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

// logout  route configuration

app.post("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});



// Server is listening at port 5000
app.listen(5000, () => {
  console.log("Server is working!!");
});



// ❓ Can a hacker get the JWT token? How?

// Yes, they can — if you don’t protect the token properly.

// The JWT token lives on the client side (browser/mobile) — and hackers use different tricks to steal it.


// solution - Always use HTTPS — never serve JWT over plain HTTP

// 🔓 Problem with HTTP:
// When your website or API uses plain HTTP, all data sent between the client (browser) and server is:

// Unencrypted

// Readable by anyone sitting in the middle (e.g., on public Wi-Fi, proxies, ISPs)


// 🔐 With HTTPS:
// Everything is encrypted

// Even if a hacker intercepts it, they see gibberish

// They can’t read your token, headers, or data


// ❓ Can we decode a JWT without using jwt.verify()?

// ✅ Yes, you absolutely can.

// 🔍 But here’s the catch:
// Decoding a JWT just reads the data inside (header and payload)

// It does not check if the token is valid or untampered



// ✅ jwt.decode() — Read only (⚠️ Not secure)
// Example:

// js
// Copy
// Edit
// const jwt = require("jsonwebtoken");

// const token = jwt.sign({ _id: "12345" }, "secretkey");

// // Just decode, no signature check
// const decoded = jwt.decode(token);

// console.log(decoded);


