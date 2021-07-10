// Dependencies
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const animals = require("./routers/animals");
const applications = require("./routers/applications");
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
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
app.use("/animals", animals);
app.use("/applications", applications);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
