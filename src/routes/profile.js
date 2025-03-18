const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Requets");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);

    // we are setting the value here

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    // res.send(`${loggedInUser.firstName},"edit updated sucessfuly"`);

    res.json({
      message: `${loggedInUser.firstName},"edit updated sucessfuly"`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});

module.exports = profileRouter;
