const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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

//login

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

    const isStrongPassword = await bcrypt.compare(password, user.password);
    console.log(isStrongPassword);

    if (isStrongPassword) {
      // first argument is the data we are going to hide
      // second argument is  secert key
      const token = await jwt.sign({ _id: user._id }, "van@009$");

      res.cookie("token", token);
      res.send("Login Sucessfull");
    } else {
      throw new Error("login failed please check password and email id ");
    }
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});

app.get("/profile", async (req, res) => {
  // this wil give all the cookies
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedMessage = await jwt.verify(token, "van@009$");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;

  //Get user By email
  try {
    const user = await User.find({
      emailID: userEmail,
    });

    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//Get all users
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});

    if (user.length === 0) {
      res.status(404).send("no users found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/Oneuser", async (req, res) => {
  const userEmail = req.body.emailID;

  //Get user By email
  try {
    const user = await User.findOne({
      emailID: userEmail,
    });

    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userID = req.body.userID;

  //Get user By email
  try {
    const user = await User.findByIdAndDelete(userID);
    res.send("user deleted sucessully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userID = req.params?.userId;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      // res.status(400).send(" update not allowed ");
      throw new Error("update not allowed");
    }

    if (data?.skills > length > 10) {
      throw new Error("error its more expexted length");
    }

    const user = await User.findByIdAndUpdate({ _id: userID }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated sucessfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err);
  }
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
