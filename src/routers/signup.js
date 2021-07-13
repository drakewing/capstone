const express = require("express");
const passport = require("passport");

// App data
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup");
});

router.post(
  "/",
  passport.authenticate("localSignup", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

module.exports = router;
