const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxlength: 50,
    },
    lastname: {
      type: String,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email id");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("not strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid url id");
        }
      },
    },
    about: {
      type: String,
      default: "This is a defualt about of the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWt = async function (params) {
  // becuase all the user are instance of user \
  // note this function will not work in arrow function
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "van@009$", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  // this refering to that user
  const user = this;
  const hashPassword = user.password;

  const isStrongPassword = bcrypt.compare(passwordByUser, hashPassword);

  return isStrongPassword;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
