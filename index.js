const cors = require('cors');
const express = require('express');

// create express app
const app = express();
app.use(cors());

// setup server port
const port = process.env.PORT || 3000;

// parse requests of content-type - application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
