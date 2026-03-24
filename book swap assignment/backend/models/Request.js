const mongoose = require("mongoose")

const RequestSchema = new mongoose.Schema({

bookId:String,
requester:String,
owner:String,
status:{
type:String,
default:"pending"
}

})

module.exports = mongoose.model("Request",RequestSchema)