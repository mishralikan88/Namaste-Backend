import express from "express";
import mongoose from "mongoose";

const app = express();

// using JSON middle ware

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

// READ USER API - users/all 

app.get("/users/all", async (req, res) => {
  const users = await User.find({}).then();
  res.json({
    success: true,
    users,
  });
});

// CREATE USER API - /users/new

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

// GET USER ID API - /userid

app.get("/userid", async (req, res) => {
  const {id} = req.query 
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
});


// order matters - Always write dynamic API after the Static API
// http://localhost:4000/userid/special => hits the below API . Not the one after the below API

app.get("/userid/special", async (req, res) => {
  res.json({
    success: true,
    message: "just Joking",
  });
});

app.get("/userid/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
});

// server listening at port 4000

app.listen(4000, () => console.log("server is working"));
