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
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// DB Model creating
const Message = mongoose.model("message", messageSchema);
const app = express();


// using static middleware
app.use(express.static(path.join(path.resolve(), "public")));

// using urlencoded middleware
app.use(express.urlencoded({ extended: true }));


// using cookie parser middle ware to receieve cookies from the client request
app.use(cookieParser())

// setting  project view engine
app.set("view engine", "ejs");

// Authentication API Logic
app.get("/", (req, res) => {
  // console.log(req.cookies) // you can see this if  httpOnly:false while you set the cookie and we need a middleware cookie parser to access this.
  const { token } = req.cookies; 
  if (token) {
    res.render("logout");
  } else {
    res.render("login");
  }
});

// login  routes configuration

app.post("/login",(req,res)=>{
  // setting up cookie on login
  res.cookie("token","TokenID",{
    httpOnly:true,                        // restricts accessing cookie from client side.server side accesible only . Secure
    expires:new Date(Date.now()+60*1000) // expired time = current login time + 60 sec
  })
  res.redirect("/")
})


// logout  route configuration

app.post("/logout",(req,res)=>{
  // deleting cookie on logout
  res.cookie("token",null,{
    httpOnly:true,                        
    expires:new Date(Date.now()) // expiring cookie when logout button is clicked in the UI and /logout API is invoked. 
  })
  res.redirect("/")
})





// contact page routes configuration

app.post("/contact", async(req, res) => {
  console.log(req.body);
  const {name,email} = req.body
  await Message.create({name,email}) 

  res.redirect("/success");
});

app.get("/success", (req, res) => {
  res.render("success");
});

// add route

app.get("/add", async (req, res) => {
  await Message.create({ name: "Amar", email: "mishralikan88@gmail.com" });
  res.send("Nice")
});

// Server is listening at port 5000
app.listen(5000, () => {
  console.log("Server is working!!");
});




// When a user logs in to a website, a cookie (often containing a session ID or JWT token) is typically set in the browser to identify/authenticate the user.

// When the user logs out, the cookie is deleted (or invalidated).

// If the user is inactive for too long, the cookie can expire automatically based on its expires or max-age property.

// Once the cookie expires or is destroyed, the session becomes invalid, and the user gets logged out.

// When a user logs into a website, a cookie is usually set to maintain the session. On logout, this cookie is deleted or invalidated. Additionally, if the user remains inactive for a certain period, the cookie may expire based on its configured expiration time — leading to automatic logout due to session timeout.