const express = require("express");

// means we are creating the express js application
// i
const app = express();

app.use("/user", (req, res) => {
  res.send("HAHAHA");
});

// this wiil only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "sharath", lastname: "s" });
});

app.post("/user", (req, res) => {
  res.send("data sucessfuly saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("data sucessfuly delete from database");
});

// this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server !");
});

// we will have to listen to incoming request
app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
