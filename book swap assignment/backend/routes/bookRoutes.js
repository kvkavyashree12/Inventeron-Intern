const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {

const books = await Book.find();
res.json(books);

});

router.post("/add", async (req, res) => {

const book = new Book(req.body);
await book.save();

res.json("Book added");

});

module.exports = router;