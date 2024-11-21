"use strict";

const dbConn = require("../../config/db.config");

// Contact object constructor
const Contact = function (contact) {
    this.lastName = contact.lastName;
    this.firstName = contact.firstName;
    this.emailAddress = contact.emailAddress;
    this.contactNumber = contact.contactNumber;
    this.isDeleted = contact.isDeleted || 0; // Default to 0
};

// Create a new contact
Contact.create = (newContact, result) => {
    dbConn.query("INSERT INTO contact_list SET ?", newContact, (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log("Contact added:", res.insertId);
            result(null, res.insertId);
        }
    });
};

// Retrieve all contacts
Contact.getAll = (result) => {
    dbConn.query(
        "SELECT * FROM contact_list WHERE isDeleted = 0",
        (err, res) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else {
                console.log("Contacts retrieved:", res.length);
                result(null, res);
            }
        }
    );
};

// Retrieve a single contact by ID
Contact.getById = (id, result) => {
    dbConn.query(
        "SELECT * FROM contact_list WHERE id = ?",
        [id],
        (err, res) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else if (res.length === 0) {
                // No contact found with this ID
                result({ kind: "not_found" }, null);
            } else {
                console.log("Contact retrieved:", res[0]);
                result(null, res[0]);
            }
        }
    );
};

// Update a contact by ID
Contact.update = (id, contact, result) => {
    dbConn.query(
        "UPDATE contact_list SET lastName=?, firstName=?, emailAddress=?, contactNumber=? WHERE id=?",
        [
            contact.lastName,
            contact.firstName,
            contact.emailAddress,
            contact.contactNumber,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
            } else {
                console.log("Contact updated:", id);
                result(null, res);
            }
        }
    );
};

// Mark a contact as deleted by updating `isDeleted`
Contact.delete = (id, result) => {
    dbConn.query(
        "UPDATE contact_list SET isDeleted=1 WHERE id=?",
        id,
        (err, res) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
            } else {
                console.log("Contact deleted:", id);
                result(null, res);
            }
        }
    );
};

module.exports = Contact;
