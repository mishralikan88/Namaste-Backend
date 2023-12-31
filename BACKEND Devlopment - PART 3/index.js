// express is a framework
import express from "express";
import path from "path"

const app = express(); // created an app server using express

const publicPath = path.join(path.resolve(),"public")
const middleware = express.static(publicPath) // making the directory or public folder static and this returns a middleware
app.use(middleware) // app server using the middleware 

app.set("view engine", "ejs"); // setting up server view engine

// app.get("/", (req, res) => {
//   res.sendStatus(404)
//   res.send("Hi") // send sends the content to body of the incoming request or page body.
//   res.json({ // sends json back to the browser page
//     success: true,
//     products: [],
//   });
//    res.status(400).send("He He .. ") // In Page body He He will be shown and in browser console Window 400 is logged
// });

// app.get("/getProducts", (req, res) => {
//   const pathLocation = path.resolve()
//   console.log("path =>",path)                          // path object is shown in node terminal
//   console.log("path location =>",pathLocation)        // pathLocation = D:\BACKEND\BACKEND Devlopment - PART 3
//   console.log(path.join(pathLocation,"index.html"))  // pathLocation = D:\BACKEND\BACKEND Devlopment - PART 3\index.html
//   res.sendFile(path.join(pathLocation,"index.html"));

// });

app.get("/", (req, res) => {
  // res.render("index", { name: "Lycan" }); // passing dynamic data to index page in views directory
  res.sendFile("index.html") // sending static File index.html to the browser on requesting localhost:5000 . This line is Optional.By default index.html is sent back.middleware is doing the job already on top.
});

app.listen(5000, () => {
  // listening the app server on 5000 port
  console.log("Server is working!!");
});
