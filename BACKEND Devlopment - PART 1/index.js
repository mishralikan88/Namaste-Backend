// built in module
const http = require("http");

// File based Module
const gfName = require("./girlFriend")

console.log(gfName)

// console log will be shown in node terminal when we go to the browser address and provide localhost:5000 or localhost:5000/<anything>
// and press enter.

const server = http.createServer((req, res) => {
  // console.log("Served")
  console.log(req.url);
  // res.end("Nice!!")]
  if (req.url == "/about") {
    res.end("<h1> About Page</h1>");
  } else if (req.url == "/") {
    res.end("<h1> Home Page</h1>");
  } else if (req.url == "/contact") {
    res.end("<h1> Contact Page</h1>");
  } else {
    res.end("<h1> page Not Found</h1>");
  }
});

// console log will be shown in node terminal when node listens to the server or when we start the server by node . or nodemon .\index.js command
server.listen(5000, () => {
  console.log("server is working");
});
