const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Import your API routes
const api = require("./api"); // if you have API routes, else remove

// Enable CORS
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

// Serve static HTML files from 'html' folder
app.use(express.static(path.join(__dirname, "html")));

// Serve index.html at root to fix 404
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "download.html"));
});

// Use API routes
app.use(api); // if api.js exists

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
