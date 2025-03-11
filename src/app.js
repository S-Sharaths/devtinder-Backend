const express = require("express");
const { adimAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adimAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("ALL data sent");
});

// for user auth we can define like below  or as per 16th line
// app.use("/user", userAuth);

app.get("/user", userAuth, (req, res, next) => {
  res.send("user");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("delete a user");
});

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
