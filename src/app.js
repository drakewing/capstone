// Dependencies
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const animals = require("./routers/animals");
const applications = require("./routers/applications");
const signup = require("./routers/signup");
const users = require("./routers/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

// App data
const PORT = process.env.PORT || 8080;
const app = express();

// handlebars template engine
app.engine(
  "handlebars",
  exphbs({
    partialsDir: path.join(__dirname, "/views/partials/"),
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// static files in public folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "TEST SECRET PLEASE IGNORE" }));
app.use(passport.initialize());
app.use(passport.session());

// Auth middleware
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Page routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

// Routers for specific pages
app.use("/animals", animals);
app.use("/applications", applications);
app.use("/signup", signup);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
