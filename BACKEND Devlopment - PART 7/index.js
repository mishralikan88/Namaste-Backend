import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

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

const isAuthenticated = (req, res, next) => { 
  const { token } = req.cookies;
  if (token) {
    next(); // next() calls the next() handler
    // res.render("logout");
  } else {
    res.render("login");
  }
}; 

// Authentication API Logic

app.get("/", isAuthenticated, (req, res) => { // get() receives APIpath and then handlers ...
  // if next() inside isAuthenticated is called , this will call the subsequent handler which is (req, res) => {}
  res.render("logout");
});

// login  routes configuration

app.post("/login", (req, res) => {
  res.cookie("token", "TokenID", {
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
