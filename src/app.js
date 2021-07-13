// Dependencies
const { Datastore } = require("@google-cloud/datastore");
const { DatastoreStore } = require("@google-cloud/connect-datastore");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { User } = require("./models/user");
const animals = require("./routers/animals");
const applications = require("./routers/applications");
const login = require("./routers/login");
const signup = require("./routers/signup");
const users = require("./routers/users");

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
  // Datastore Sessions
  session({
    store: new DatastoreStore({
      kind: "express-sessions",
      expirationMs: 0,
      dataset: new Datastore({
        projectId: process.env.GCLOUD_PROJECT,
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      }),
    }),
    secret: "my-secret",
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Auth middleware

// Sign up flow
passport.use(
  "localSignup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      // Make sure no one has signed up with this email already.
      let user = await User.findOne({ username: req.body.username }, () => {});
      if (typeof user !== "undefined") {
        return done(null, false, {
          message: "Error: user's email already exists.",
        });
      }

      // Make sure passwords match
      if (req.body.password !== req.body.confirmPassword) {
        return done(null, false, {
          message: "Error: password and confirmation don't match.",
        });
      }

      user = new User();
      user.setEmail(username);
      await user.setPassword(password);
      await user.save();
      return done(null, user);
    }
  )
);

// Log In flow
passport.use(
  "localSignin",
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username }, () => {});

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    if (!(await user.validPassword(password))) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.entity.id);
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

app.get("/profile", (req, res) => {
  res.render("profile");
});


app.get("/profile", (req, res) => {
  res.render("profile");
});


app.get("/add_animal", (req, res) => {
  res.render("add_animal");
});

app.get("/animals", (req, res) => {
  // if user clicks the "next" button to see more results
  if (Object.keys(req.query).includes("cursor")) {
    const { cursor } = req.query;
    getPets(cursor).then((petInventory) => {
      console.log(petInventory);
      petInventory.layout = false;
      res.render("partials/animalsgrid", petInventory);
    });
  } else {
    // loads full animals page
    getPets(null).then((petInventory) => {
      console.log(petInventory);
      res.render("animals", petInventory);
    });
  }
});

// Routers

// Routers for specific pages

app.use("/animals", animals);
app.use("/applications", applications);
app.use("/login", login);
app.use("/signup", signup);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
