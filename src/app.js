const express = require("express");

const app = express();

app.use(
  "/user",

  (req, res, next) => {
    console.log("handling the route user 2");
    // res.send("reponse 1 !!");

    next();
  },

  (req, res) => {
    console.log("handling the route user 2");
    res.send("reponse 2 !!");
  }
);

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
