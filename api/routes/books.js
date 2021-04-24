const express = require("express");
const router = express.Router();
const Books = require("../controllers/Books");

router.route("/getall").get(Books.getAllBooks).post(Books.addABook);

module.exports = router;
