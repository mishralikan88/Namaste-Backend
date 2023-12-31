import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Message = mongoose.model("message", messageSchema);

const app = express();

// const users = []; // removing user array which was storing user data from the form

const publicPath = path.join(path.resolve(), "public"); // Making public folder static - By default http://localhost:5000/ loads index.html inside static folder public.if the index html not found it will pick index.ejs from views fodler since we have set project view engine as ejs.static index.html takes priority over views index.ejs
const staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);

const formdataReceiverMiddleware = express.urlencoded({ extended: true });
app.use(formdataReceiverMiddleware);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Lycan" });
});


app.get("/add", async (req, res) => {
  await Message.create({ name: "Amar", email: "mishralikan88@gmail.com" });
  res.send("Nice")
});

app.post("/contact", async(req, res) => {
  console.log(req.body);
  // users.push({ username: req.body.name, email: req.body.email });
  // destructuring request body one the fly.
  const {name,email} = req.body
  // await Message.create({name:name,email:email})
  await Message.create({name,email}) // short hant syntax  If keys and values are same like above line of code.

  res.redirect("/success");
});

app.get("/success", (req, res) => {
  res.render("success");
});

// app.get("/users", (req, res) => {
//   res.json({ users });
// });

app.listen(5000, () => {
  console.log("Server is working!!");
});
