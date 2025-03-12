const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sharathprogramming4:*****@node.rcgdp.mongodb.net/divTinder"
  );
};

// connectdb will return as a promise
connectDB()
  .then(() => {
    console.log("Database connection was successfull");
  })
  .catch((err) => {
    console.error("Database cannot be connected !!");
  });
