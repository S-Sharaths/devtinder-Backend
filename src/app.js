const express = require("express");
require("./config/database");

const app = express();

app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
