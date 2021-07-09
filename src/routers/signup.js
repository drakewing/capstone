const express = require("express");
const passport = require("passport");
// const { Datastore } = require("@google-cloud/datastore");

// App data
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
  }),
  (req, res) => {
    console.log("working!");
    res.redirect(307, "/");
  }
);

module.exports = router;
