const express = require("express");
const booksRoute = require("./books");
const userRoute = require("./signin");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/books",
    route: booksRoute,
  },
  {
    path: "/accounts",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
