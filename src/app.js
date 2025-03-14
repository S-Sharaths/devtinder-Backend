const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added sucessfully");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
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

    if(data?.skills>length >10){
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
