const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token is not valid");
    }

    const decodedObject = await jwt.verify(token, "van@009$");

    const { _id } = decodedObject;

    // const user = await User;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
};

module.exports = {
  userAuth,
};
