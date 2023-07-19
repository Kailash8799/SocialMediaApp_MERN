// import Authuser from '../middleware/authuser';
const express = require('express');
const router = express.Router();
const User = require("../models/User")
const mongoose = require('mongoose');


router.post('/signup',async(req,res)=>{
    const ne = new User({
        name:"kailash"
    })
    await ne.save()
    res.json({success:true,message:"Your account has been created successfully"});
});

router.post('/signin',async(req,res)=>{
    res.json({success:true,message:"Signin successfully"})
})
router.post('/forgotpassword',async(req,res)=>{
    res.json({success:true,message:"Forgot Password successfully"})
})

router.post('/getUser',async(req,res)=>{
    res.json({success:true,message:"Forgot Password successfully"})
})
router.post('/updateUser',async(req,res)=>{
    res.json({success:true,message:"Forgot Password successfully"})
})


module.exports = router;