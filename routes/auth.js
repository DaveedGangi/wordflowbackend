const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const User=require("../models/User");

const router=express.Router();

router.post("/register",async(req,res)=>{
    const{username,password}=req.body;
    try{
        const user=new User({username,password});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

router.post("/login",async(req,res)=>{
    const{username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user) return res.status(400).json({error:"User not found"});
        const match=await bcrypt.compare(password,user.password);
        if(!match) return res.status(401).json({error:"Invalid password"});
        console.log(user);
        const token=jwt.sign({userId:user._id,username:user.username},process.env.JWT_SECRET);
        res.json({token});
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports=router;