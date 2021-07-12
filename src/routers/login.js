const express = require("express");
const passport = require("passport");

// App data
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("localSignin", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

module.exports = router;
