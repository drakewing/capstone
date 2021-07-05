// Dependencies
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');

// App data
const PORT = process.env.PORT || 8080;
const app = express();

// handlebars template engine
app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/profile", (req, res)  => {
  res.render("profile");
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
