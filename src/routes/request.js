const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequests = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;

      const toUserId = req.params.toUserId;

      const status = req.params.status;

      const allowedStatus = ["ignore", "instersted"];

      // console.log(!allowedStatus.includes(status));

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type " + status });
      }

      const existingConnectionRequest = await connectionRequests.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      console.log(existingConnectionRequest + "ddddddd");

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "connection request already Exists",
        });
      }

      const connectionRequest = new connectionRequests({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "connection Request sent successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
