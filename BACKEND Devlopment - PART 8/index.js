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

//   res.cookie("token", user._id, { // shows the user id stored in db to the browser cookie .less secure 
//     httpOnly: true,
//     expires: new Date(Date.now() + 60 * 1000),
//   });
//   res.redirect("/");
// });


// better security as we are using jwt .
app.post("/login", async (req, res) => {
  const {name,email} = req.body
  const user = await User.create({name,email})
  const token =jwt.sign({_id:user._id},"SecretKey")
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
