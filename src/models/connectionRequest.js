const mongoose = require("mongoose");

const connectionRequestschema = mongoose.Schema(
  {
    // bascially connection request will have sender and reciver

    fromUserId: {
      // since we are going to store _id below should be there type
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      // we will create enum when we want to restict user to some values
      required: true,
      enum: {
        values: ["ignore", "instersted", "accepeted", "rejected"],
        //  if the values is not threre inthis we will get error
        message: `{value} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestschema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestschema.pre("save", function () {
  const connectionRequest = this;
  // check if the fromuserid is same as touserid

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("cannot send connection request to yourself");
  }

  next();
});

const ConnectionRequestModel = new mongoose.model(
  "connectionRequests",
  connectionRequestschema
);

module.exports = ConnectionRequestModel;
