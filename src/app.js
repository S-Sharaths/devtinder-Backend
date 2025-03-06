const express = require("express");

const app = express();

// this will match all the HTTP method API calls to /test
//it will the request like /user  ,/user/xyz , /user/1
app.get("/user/:userid/:name/:password", (req, res) => {
  console.log(req.params);
  res.send("Hello from the server !");
});

// we will have to listen to incoming request
app.listen(1234, () => {
  console.log("the server is sucessfully listen  on port 1234");
});
