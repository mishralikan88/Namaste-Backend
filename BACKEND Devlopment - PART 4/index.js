import express from "express";
import path from "path";
import mongoose from "mongoose";

// Connecting Node with Mongo DB
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

// creating  the scehma for data validation which will go inside the Mongo DB document(record in SQL).schema - structure of the data which will store as a document/json in the collection.
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// creating a model message - Message.create() will create a collection (table in SQL) in the database
const Message = mongoose.model("message", messageSchema);

// creating a server named app
const app = express();

const users = [];

// Using middlewares

// using staticMiddleware
const publicPath = path.join(path.resolve(), "public"); // Making public folder static - By default http://localhost:5000/ loads index.html inside static folder public.if the index html not found it will pick index.ejs from views fodler since we have set project view engine as ejs.static index.html takes priority over views index.ejs
const staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);

// using formdataReceiverMiddleware.This middleware accepts the form submitted by user in post API .
const formdataReceiverMiddleware = express.urlencoded({ extended: true });
app.use(formdataReceiverMiddleware);

// setting up project view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Lycan" });
});

// app.get("/add", (req, res) => {
//   Message.create({ name: "Amar", email: "mishralikan88@gmail.com" }).then(() =>
//     res.send("Nice")
//   );
// });

// using async await version of the above API
app.get("/add", async (req, res) => {
  await Message.create({ name: "Amar", email: "mishralikan88@gmail.com" });
  res.send("Nice")
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  users.push({ username: req.body.name, email: req.body.email });
  // res.render("success")
  res.redirect("/success");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/users", (req, res) => {
  res.json({ users });
});

// listening to the server.
app.listen(5000, () => {
  console.log("Server is working!!");
});
