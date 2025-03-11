const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
  console.log("admin auth is getting checked !!");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("ALL data sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("delete a user");
});

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
