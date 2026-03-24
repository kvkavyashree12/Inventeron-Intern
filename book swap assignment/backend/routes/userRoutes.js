const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

router.post("/register", async(req,res)=>{

const hashed = await bcrypt.hash(req.body.password,10)

const user = new User({
name:req.body.name,
email:req.body.email,
password:hashed
})

await user.save()
res.json("User Registered")

})

router.post("/login", async(req,res)=>{

const user = await User.findOne({email:req.body.email})

if(!user) return res.json("User not found")

const valid = await bcrypt.compare(req.body.password,user.password)

if(!valid) return res.json("Wrong password")

res.json("Login success")

})

module.exports = router