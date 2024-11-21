"use strict";

const Contact = require("../models/contact.model");

// Create a new contact
exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.lastName ||
        !req.body.firstName ||
        !req.body.emailAddress ||
        !req.body.contactNumber
    ) {
        return res.status(400).send({
            message: "All fields are required.",
        });
    }

    // Create a new contact object
    const newContact = new Contact({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        emailAddress: req.body.emailAddress,
        contactNumber: req.body.contactNumber,
        isDeleted: 0,
    });

    // Insert the new contact into the database
    Contact.create(newContact, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while adding the contact.",
            });
        }
        res.status(201).send({
            message: "Contact added successfully!",
            contactId: data,
        });
    });
};

// Retrieve all contacts
exports.getAll = (req, res) => {
    Contact.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving contacts.",
            });
        }
        res.status(200).send(data);
    });
};

// Retrieve a single contact by ID
exports.getById = (req, res) => {
    const contactId = req.params.id;

    Contact.getById(contactId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Contact not found with id ${contactId}`,
                });
            }
            return res.status(500).send({
                message: "Error retrieving contact with id " + contactId,
            });
        }
        res.status(200).send(data);
    });
};

// Update a contact
exports.update = (req, res) => {
    const contactId = req.params.id;

    if (
        !req.body.lastName ||
        !req.body.firstName ||
        !req.body.emailAddress ||
        !req.body.contactNumber
    ) {
        return res.status(400).send({
            message: "All fields are required.",
        });
    }

    const updatedContact = new Contact({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        emailAddress: req.body.emailAddress,
        contactNumber: req.body.contactNumber,
    });

    Contact.update(contactId, updatedContact, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Contact not found with id ${contactId}`,
                });
            }
            return res.status(500).send({
                message: "Error updating contact with id " + contactId,
            });
        }
        res.status(200).send({
            message: "Contact updated successfully!",
        });
    });
};

// Delete a contact
exports.delete = (req, res) => {
    const contactId = req.params.id;

    Contact.delete(contactId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Contact not found with id ${contactId}`,
                });
            }
            return res.status(500).send({
                message: "Error deleting contact with id " + contactId,
            });
        }
        res.status(200).send({
            message: "Contact deleted successfully!",
        });
    });
};
