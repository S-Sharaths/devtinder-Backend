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
