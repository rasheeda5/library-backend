const Books = require("../models/books");

exports.getAllBooks = async function (req, res) {
  try {
    res.status(200).json(await Books.find({}));
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

exports.addABook = async function (req, res) {
  try {
    var newBook = new Books(req.body);
    const book = await newBook.save({});
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};
