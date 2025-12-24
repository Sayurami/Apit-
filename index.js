const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Import API routes
const api = require("./api"); // TikTok download API

// Enable CORS & JSON
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

// Serve static HTML files
app.use(express.static(path.join(__dirname, "html")));

// Serve download.html at root to fix 404
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "download.html"));
});

// Use API routes
app.use(api);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
