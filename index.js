const cors = require('cors');
const express = require('express');

// create express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the contact routes
const contactRoutes = require('./src/routes/contact.route');

// Setup server port
const port = process.env.PORT || 3000;

// Use the contact routes
contactRoutes(app);

// Define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
