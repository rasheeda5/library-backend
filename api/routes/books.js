const { Router } = require("express");
const books = require("../controllers/books");

module.exports = function (app) {
  app.route("/books").get(books.getAllBooks).post(books.addABook);

  //   app.route("/books/:bookId").get(books.get_details);
};
