const books = require("../models/books");

exports.getAllBooks = async function (req, res) {
  try {
    res.status(200).json(await books.find({}));
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

exports.addABook = async function (req, res) {
  try {
    var newBook = new books(req.body);
    // new_book.save(function (err, book) {
    //     if (err) res.send(err);
    //     res.json(book);
    //   });
    const book = await newBook.save({});
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};
