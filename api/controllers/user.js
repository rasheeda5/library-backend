const User = require("../models/User");
const UserSession = require("../models/UserSession");

exports.signup = async function (req, res) {
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
};

exports.signin = async function (req, res) {
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
      // console.log(user.password);
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
};

exports.verify = async function (req, res) {
  const { query } = req;
  const { token } = query;
  // console.log('Token')
  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "server error",
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "does not exist",
        });
      }

      return res.send({
        success: true,
        message: "all good",
      });
    }
  );
};

exports.logout = async function (req, res) {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "server error",
        });
      }

      return res.send({
        success: true,
        message: "all good",
      });
    }
  );
};
