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
const { Datastore } = require("@google-cloud/datastore");
const { DatastoreStore } = require("@google-cloud/connect-datastore");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: new DatastoreStore({
      kind: "express-sessions",

      // Optional: expire the session after this many milliseconds.
      // note: datastore does not automatically delete all expired sessions
      // you may want to run separate cleanup requests to remove expired sessions
      // 0 means do not expire
      expirationMs: 0,

      dataset: new Datastore({
        // For convenience, @google-cloud/datastore automatically looks for the
        // GCLOUD_PROJECT environment variable. Or you can explicitly pass in a
        // project ID here:
        projectId: process.env.GCLOUD_PROJECT,

        // For convenience, @google-cloud/datastore automatically looks for the
        // GOOGLE_APPLICATION_CREDENTIALS environment variable. Or you can
        // explicitly pass in that path to your key file here:
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      }),
    }),
    secret: "my-secret",
  })
);
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
  console.log(req.user);
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
