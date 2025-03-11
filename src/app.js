const express = require("express");

const app = express();

app.use(
  "/user",

  (req, res, next) => {
    console.log("handling the route user 2");
    next();
    // res.send("reponse 1 !!");
  },

  (req, res, next) => {
    console.log("handling the route user 2");
    // res.send("reponse 2 !!");
    next();
  },

  (req, res, next) => {
    console.log("handling the route user 2");
    // res.send("reponse 2 !!");
    next();
  },

  (req, res, next) => {
    console.log("handling the route user 2");
    // res.send("reponse 2 !!");
    // next();
  }
);

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
