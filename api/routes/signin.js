// const User = require("../models/User");
const express = require("express");
const router = express.Router();
const Users = require("../controllers/user");

router.route("/signup").post(Users.signup);

router.route("/signin").post(Users.signin);

router.route("/verify").get(Users.verify);

router.route("/logout").get(Users.logout);

module.exports = router;
