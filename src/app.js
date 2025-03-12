const express = require("express");
const { adimAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/admin/getAllData", (req, res, next) => {
  // logic of db call and get user data

  try {
    throw new error("dvbzjf");
    res.send("user data sent");
  } catch (err) {
    res.status(500).send("something went wrong contact support team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
