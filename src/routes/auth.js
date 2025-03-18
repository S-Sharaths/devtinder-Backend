const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signUp", async (req, res) => {
  try {
    // validation
    validateSignUpData(req);

    // encryption

    const { firstName, lastName, emailID, password } = req.body;
    // first argument if password and second agument is salt round (if its more it very tough to  break )
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // itnot good way of creating a instace of model we need to explcity define
    // const user = new User({ });

    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    //

    await user.save();
    res.send("user added sucessfully");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
  }
});

authRouter.post("/Login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    if (!validator.isEmail(emailID)) {
      throw new Error("in valid email id");
    }
    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("EmailID id not present in DB");
    }
    // first we will check there email id is available or not
    // next we wil bring crossponding password from db and compare it with password db

    const isStrongPassword = await user.validatePassword(password);
    console.log(isStrongPassword);

    if (isStrongPassword) {
      // first argument is the data we are going to hide
      // second argument is  secert key
      const token = await user.getJWt();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Sucessfull");
    } else {
      throw new Error("login failed please check password and email id ");
    }
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});

authRouter.post("/Logout", async (req, res) => {
  res.cookie("token", null, {
    expries: new Date(Date.now()),
  });

  res.send("logged out sucessfully");
});

module.exports = authRouter;
