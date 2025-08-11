import express from "express";
import mongoose from "mongoose";

const app = express();

// without express.json() middleware, JSON sent from Postman will not be parsed, and req.body will be undefined.

// Adding app.use(express.json()) parses JSON  and stores it in req.body.

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
  const users = await User.find({});
  res.json({
    success: true,
    users, // Alternative users:users
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


// static URL - http://localhost:4000/userid

// app.get("/userid", async (req, res) => {

// Input data (Postman Body)
// Body → raw → JSON:
// {
//   "id": "12345",
//   "name": "Likan"
// }

// req.body - { id: '12345', name: 'Likan' }
// const { id } = req.body; 

// Input Data (Postman URL)
// GET http://localhost:4000/userid/999?id=12345&name=Likan

// req.query - { id: '12345', name: 'Likan' }
// const { id } = req.query 

//   const user = await User.findById(id);
//   res.json({
//     success: true,
//     user,
//   });
// });


// dynamic URL - http://localhost:4000/userid/1234
// id 1234  gets stored in params object.

app.get("/userid/:id", async (req, res) => {
  // console.log(req.params)   // Input Request - GET http://localhost:4000/userid/12345 , /userid/:id , params - { id: '12345' }  where id is from the configured route.
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
});


app.get("/userid/profile", async (req, res) => {
  res.json({
    success: true,
    message: "just Joking",
  });
});



// server listening at port 4000
app.listen(4000, () => console.log("server is working"));



// You put dynamic routes at the end because in Express (and most routing systems) routes are matched in the order they’re defined — first match wins.

// Why this matters ?
// If you place a dynamic route before more specific routes, it can “catch” requests that were meant for the specific ones.

// Example:

// ❌ Wrong order
// app.get("/user/:id", (req, res) => res.send("Dynamic user"));
// app.get("/user/profile", (req, res) => res.send("Profile"));

// Request: GET /user/profile
// Output: "Dynamic user" ❌ — because :id matches "profile" first.

// ✅ Correct order:
// //  Specific routes first
// app.get("/user/profile", (req, res) => res.send("Profile"));
// app.get("/user/:id", (req, res) => res.send("Dynamic user"));

// Request:
// GET /user/profile → "Profile"
// GET /user/123     → "Dynamic user"

// Rule:
// Place static/specific routes first (/user/profile)
// Place dynamic/wildcard routes last (/user/:id, /user/*)