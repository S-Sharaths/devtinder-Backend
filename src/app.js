const express = require("express");
const { adimAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adimAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("ALL data sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("delete a user");
});

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
