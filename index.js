// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const ejs = require("ejs");

// Serve static HTML files
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Specify the directory for views

// Route for the main page
app.get("/", (req, res) => {
  const tinyKey = process.env.TINY_KEY;
  res.render("index", { tinyKey });
});

// Route for the test page
app.get("/test", (req, res) => {
  const tinyKey = process.env.TINY_KEY;
  res.render("test", { tinyKey });
;

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});