"use strict";

module.exports = (app) => {
    const contact = require("../controllers/contact.controller");

    // Create a new contact
    app.post("/contacts", contact.create);

    // Retrieve all contacts
    app.get("/contacts", contact.getAll);

    // Retrieve a single contact by ID
    app.get("/contacts/:id", contact.getById);

    // Update a contact by ID
    app.put("/contacts/:id", contact.update);

    // Delete a contact by ID
    app.delete("/contacts/:id", contact.delete);
};
