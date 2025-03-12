const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sharathprogramming4:vBSTwe80Lq5ctJKA@node.rcgdp.mongodb.net/divtinder"
  );
};

// connectdb will return as a promise
module.exports = connectDB;
