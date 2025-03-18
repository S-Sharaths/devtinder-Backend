const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {
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

app.post("/Login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
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

app.post("/sendConnectionRequet", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending a connection request");

  res.send(user.firstName + " sending a connection request");
});

connectDB()
  .then(() => {
    console.log("Database connection was successful");
    app.listen(1234, () => {
      console.log("The server is successfully listening on port 1234");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
