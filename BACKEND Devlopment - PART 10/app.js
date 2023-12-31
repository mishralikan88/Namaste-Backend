import express from "express";
import mongoose from "mongoose";

const app = express();

// using Json middleware which will accept posted Json data from the postman.If we dont use this middleware unbdefined will be stored in req body whose JSON data was sent from the postman.

app.use(express.json());

// DB Connectivity

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backendAPI",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

// Schema constructing

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// DB Model creating
const User = mongoose.model("User", schema);

// default localhost URL

app.get("/", (req, res) => {
  res.send("Nice working ");
});

// User/all API

app.get("/users/all", async (req, res) => {
  console.log("query strings >>", req.query);
  console.log("name query string >>", req.query.name);
  // find({}) finds all the users from the db and returns a promise
  const users = await User.find({}).then();
  res.json({
    success: true,
    users, // alternative users:users
  });
});

app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;
  const users = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
    message: "registered successfully",
  });
});

// app.get("/userid", async (req, res) => {
//   const { id } = req.body; // if id passed is in request body of postman
//   const {id} = req.query // if the id passed is in params  of postman
//   const user = await User.findById(id);
//   res.json({
//     success: true,
//     user,
//   });
// });




// dynamic URL - http://localhost:4000/userid/1234
// static URL - http://localhost:4000/userid
// id 1234  gets stored in params object.

app.get("/userid/:id", async (req, res) => {
  // console.log(req.params)
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
});


app.get("/userid/special", async (req, res) => {
  res.json({
    success: true,
    message: "just Joking",
  });
});



// server listening at port 4000
app.listen(4000, () => console.log("server is working"));
