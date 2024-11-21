const cors = require("cors");
const express = require("express");
const path = require("path");

// Create express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the contact routes
const contactRoutes = require("./src/routes/contact.route");

// Setup server port
const port = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Use the contact routes
contactRoutes(app);

// Define a root route to serve the index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// Listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
