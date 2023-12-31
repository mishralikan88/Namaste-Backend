// using ECMA Script import statement

import http from "http";

console.log(">>>>> Importing named exports and default export <<<<<");
import gfName1 from "./girlFriends.js"; // default Import
import { gfName2, gfName3 } from "./girlFriends.js"; // Named Imports
console.log(gfName1);
console.log(gfName2);
console.log(gfName3);
console.log("            ");

console.log(
  ">>>>>>>> Importing named exports wrapped inside an object Friends <<<<<<< "
);
import * as Friends from "./girlFriends.js";
console.log(Friends);
console.log(Friends.gfName2);
console.log(Friends.gfName3);

import { generateLovePercent } from "./girlFriends.js";
console.log("Love Percent", generateLovePercent());

import fs from "fs";

const server = http.createServer((req, res) => {
  console.log(req.method)
  if (req.url == "/about") {
    res.end(`<h1> Love is ${generateLovePercent()}</h1>`);
  } else if (req.url == "/") {
    fs.readFile("./index.html", (err,readData) => {
      res.end(readData);
      console.log("index html File has been read");
    });
  } else if (req.url == "/contact") {
    res.end("<h1> Contact Page</h1>");
  } else {
    res.end("<h1> page Not Found</h1>");
  }
});

server.listen(5000, () => {
  console.log("server is working");
});
