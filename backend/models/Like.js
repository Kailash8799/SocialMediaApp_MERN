const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema(
  {
    uid: { type: String, required: true },
    profileId: { type: String, required: true },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
