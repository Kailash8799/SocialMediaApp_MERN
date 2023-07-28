const express = require("express");
const router = express.Router();
var AES_SECRET = process.env.AES_SECRET;
const nodemailer = require("nodemailer");
const REACT_APP_URL = process.env.REACT_APP_LOCALHOST;
var REACT_APP_SECRET = process.env.REACT_APP_SECRET;
const Authuser = require("../middleware/authuser");
var JWT_SECRET = process.env.JWT_SECRET;
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const Image = require("../models/Image");
const Profile = require("../models/Profile");
const Video = require("../models/Video");
const Tweet = require("../models/Tweet");

router.post("/postimage", Authuser, async (req, res) => {
  try {
    const { secret, token, imageLink, tagged, caption, hashtags } = req.body;
    if (req.method !== "POST" || REACT_APP_SECRET !== secret) {
      res.json({ success: false, message: "Some error accured!" });
      return;
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const { username, email, id, profileid } = decode;
    const user = await User.find(
      { $and: [{ username: username }, { email: email }, { _id: id }] },
      { _id: 0, username: 0, email: 0, password: 0 }
    );
    if (user?.length === 0) {
      res.json({
        success: false,
        message: "Please logout then login and try again!",
      });
      return;
    }
    let newpost = new Image({
      imageLink: imageLink,
      uid: id,
      profileId: profileid,
      tagged: tagged,
      caption: caption,
      hashtags: hashtags,
    });
    const post = await newpost.save();
    const uprofile = await Profile.findOne({
      $and: [{ _id: profileid }, { userid: id }],
    });
    const images = uprofile?.images;
    const newImages = [...images, post?._id];
    await Profile.updateOne(
      { $and: [{ _id: profileid }, { userid: id }] },
      { $set: { images: newImages } },
      { new: true }
    );
    res.json({ success: true, message: "Image uploaded successfully" });
    return;
  } catch (error) {
    res.json({ success: false, message: "Some error accured! catch" });
    return;
  }
});

router.post("/postvideo", Authuser, async (req, res) => {
  try {
    const { secret, token, videoLink, tagged, caption, hashtags } = req.body;
    if (req.method !== "POST" || REACT_APP_SECRET !== secret) {
      res.json({ success: false, message: "Some error accured!" });
      return;
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const { username, email, id, profileid } = decode;
    const user = await User.find(
      { $and: [{ username: username }, { email: email }, { _id: id }] },
      { _id: 0, username: 0, email: 0, password: 0 }
    );
    if (user?.length === 0) {
      res.json({
        success: false,
        message: "Please logout then login and try again!",
      });
      return;
    }
    let newVideopost = new Video({
      videoLink: videoLink,
      uid: id,
      profileId: profileid,
      tagged: tagged,
      caption: caption,
      hashtags: hashtags,
    });
    const post = await newVideopost.save();
    const uprofile = await Profile.findOne({
      $and: [{ _id: profileid }, { userid: id }],
    });
    const videos = uprofile?.videos;
    const newVideos = [...videos, post?._id];
    await Profile.updateOne(
      { $and: [{ _id: profileid }, { userid: id }] },
      { $set: { videos: newVideos } },
      { new: true }
    );
    res.json({ success: true, message: "Video uploaded successfully" });
    return;
  } catch (error) {
    res.json({ success: false, message: "Some error accured! catch" });
    return;
  }
});
router.post("/posttweet", Authuser, async (req, res) => {
  try {
    const { secret, token, tweet,hashtags } = req.body;
    if (req.method !== "POST" || REACT_APP_SECRET !== secret) {
      res.json({ success: false, message: "Some error accured!" });
      return;
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const { username, email, id, profileid } = decode;
    const user = await User.find(
      { $and: [{ username: username }, { email: email }, { _id: id }] },
      { _id: 0, username: 0, email: 0, password: 0 }
    );
    if (user?.length === 0) {
      res.json({
        success: false,
        message: "Please logout then login and try again!",
      });
      return;
    }
    let newTextpost = new Tweet({
      tweet: tweet,
      uid: id,
      profileId: profileid,
      hashtags:hashtags
    });
    const post = await newTextpost.save();
    const uprofile = await Profile.findOne({
      $and: [{ _id: profileid }, { userid: id }],
    });
    const tweets = uprofile?.tweets;
    const newTweets = [...tweets, post?._id];
    await Profile.updateOne(
      { $and: [{ _id: profileid }, { userid: id }] },
      { $set: { tweets: newTweets } },
      { new: true }
    );
    res.json({ success: true, message: "Tweet uploaded successfully" });
    return;
  } catch (error) {
    res.json({ success: false, message: "Some error accured! catch" });
    return;
  }
});
router.post("/postcomment", async (req, res) => {
  res.json({ success: false, message: "" });
});
router.post("/postlikes", async (req, res) => {
  res.json({ success: false, message: "" });
});
module.exports = router;
