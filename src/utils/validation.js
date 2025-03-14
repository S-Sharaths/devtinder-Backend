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

module.exports = {
  validateSignUpData,
};
