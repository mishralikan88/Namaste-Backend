import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

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
  password:String
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
    const decoded = jwt.verify(token, "SecretKey");
    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.redirect("/login");
  }
};

// Authentication API Logic

app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("logout", { name: req.user.name });
});


// register API

app.get("/register", (req, res) => {
  res.render("register");
  
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  // If user  exist in DB ,navigate the user to the login page
  if (user) {
    // console.log("Register First");
    res.redirect("./login");
  }
  // If user does not exist in DB , create one in DB
  else {
    const hashedPassword =  await bcrypt.hash(password,10) // 10 = password strength
    user = await User.create({ name, email,password:hashedPassword});
    const token = jwt.sign({ _id: user._id }, "SecretKey");
    console.log(`Token => ${token}`);

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
  }
});


// login API

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  // If logged in user doesnot exist in DB navigate the user to the register page
  if (!user) {
    res.redirect("/register");
  }
  

  // const ispasswordMatched = user?.password === password;
  const ispasswordMatched = await bcrypt.compare(password,user?.password);


  // If logged in users password stored in DB is not same as user password in the form the land on login page showing some messages.
  if (!ispasswordMatched) {
    res.render("login", {email,message: "Incorrect password" });
  }
  // If passwords matched
  else{
    const token = jwt.sign({ _id: user._id }, "SecretKey");
    console.log(`Token => ${token}`);

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");

  }
});

// logout  API

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
