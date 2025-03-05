const express = require("express");

// means we are creating the express js application
// i
const app = express();

// app.use("/", (req, res) => {
//   res.send("this is main !");
// });

// below function is know as request handler
app.use("/test", (req, res) => {
  res.send("Hello from the server !");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello hello !");
});

// we will have to listen to incoming request
app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
