const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  coverPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "in",
    enum: ["in", "out"],
  },
});

module.exports = mongoose.model("Books", BooksSchema);
