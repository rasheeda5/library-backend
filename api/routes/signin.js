const User = require("../models/User");
const UserSession = require("../models/UserSession");

module.exports = async (app) => {
  app.post("/api/account/signup", (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    if (!firstName) {
      return res.send({
        success: false,
        message: "First name blank",
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Last name blank",
      });
    }
    if (!username) {
      return res.send({
        success: false,
        message: "Username blank",
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Password blank",
      });
    }

    // console.log("hello");

    User.find(
      {
        username: username,
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error",
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Username already exists",
          });
        }

        const newUser = new User();

        newUser.username = username;
        newUser.firstName = firstName;
        // console.log(firstName);
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "server error",
            });
          }
          return res.send({
            success: true,
            message: "Signed up",
          });
        });
      }
    );
  });
  app.post("/api/account/signin", (req, res) => {
    const { username, password } = req.body;

    if (!username) {
      return res.send({
        success: false,
        message: "Username blank",
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Password blank",
      });
    }

    User.find(
      {
        username: username,
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "server error",
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "User does not exist",
          });
        }

        const user = users[0];
        console.log(user.password);
        if (!user.validPassword(password, user.password)) {
          return res.send({
            success: false,
            message: "Invalid password",
          });
        }

        const uSesh = new UserSession();
        uSesh.userId = user._id;
        uSesh.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "server error",
            });
          }

          return res.send({
            success: true,
            message: "session created",
            token: doc._id,
          });
        });
      }
    );
  });
};
