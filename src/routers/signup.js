const express = require("express");
const passport = require("passport");
// const { Datastore } = require("@google-cloud/datastore");
const { User } = require("../models/user");
const { body, validationResult } = require("express-validator");

// App data
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup");
});

router.post(
  "/",
  body("username", "Invalid email").isEmail(),
  body(
    "password",
    "Password isn't long enough. Must be 8 characters."
  ).isLength({ min: 8 }),
  body(
    "confirmPassword",
    "Password confirmation isn't long enough. Must be 8 characters."
  ).isLength({ min: 8 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Make sure no one has signed up with this email already.
    let user = await User.findOne({ username: req.body.username }, () => {});
    if (typeof user !== "undefined") {
      res.redirect("/login");
      return;
    }

    // Make sure passwords match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        errors: [
          {
            value: req.body.confirmPassword,
            msg: "Passwords don't match",
            param: "confirmPassword",
            location: body,
          },
        ],
      });
    }

    // Instantiate new user
    user = new User();
    user.setEmail(req.body.username);
    await user.setPassword(req.body.password);
    await user.save();

    res.redirect("/profile");
  }
);

module.exports = router;
