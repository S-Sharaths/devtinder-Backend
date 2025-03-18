const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  // this wil give all the cookies
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});

module.exports = profileRouter;
