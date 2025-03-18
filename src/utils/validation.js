const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("firstname and lastname cannot be empty");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("first should have length be 4-50 characters");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("not a strong passwords");
  }
};

const validateEditProfileData = (req) => {
  // first of all we will check allowed feild  for ediing
  const allowedEditFileds = [
    "firstname",
    "lastname",
    "emailid",
    "photoUrl",
    "gender",
    "age",
    "skills",
  ];

  //every feild from req we will check weather is there in allowedEditFileds if not we will not allow to edit

  const iseditallowedobject = Object.keys(req.body).every((field) =>
    allowedEditFileds.includes(field)
  );

  return iseditallowedobject;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
