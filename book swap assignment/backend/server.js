const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("../backend/routes/userRoutes")
const bookRoutes = require("../backend/routes/bookRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:5000/bookswap")

app.use("/users", userRoutes)
app.use("/books", bookRoutes)

app.listen(5000, () => {
console.log("Server running on port 5000")
})