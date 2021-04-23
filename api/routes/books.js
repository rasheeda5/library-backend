const { Router } = require("express");
const Books = require("../controllers/Books");

module.exports = (app) => {
  app.route("/books").get(Books.getAllBooks).post(Books.addABook);

  //   app.route("/books/:bookId").get(books.get_details);
};
