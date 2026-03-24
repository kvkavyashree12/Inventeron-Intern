const express = require("express")
const router = express.Router()
const Request = require("/models/Request")

router.post("/send", async(req,res)=>{

const request = new Request(req.body)

await request.save()

res.json("Swap Request Sent")

})

router.get("/all", async(req,res)=>{

const requests = await Request.find()

res.json(requests)

})

module.exports = router