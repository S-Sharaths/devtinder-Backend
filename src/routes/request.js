const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequet", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending a connection request");

  res.send(user.firstName + " sending a connection request");
});

module.exports = requestRouter;
